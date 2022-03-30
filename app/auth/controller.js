const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const payload = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        console.log("tmppath ==", tmp_path);
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        console.log("filename ==", filename);
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        console.log("targetpath ==", target_path);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const player = new Player({ ...payload, avatar: filename });
            await player.save();

            delete player._doc.password;
            res.status(201).json({ data: player });
          } catch (error) {
            if (error && error.name === "ValidationError") {
              return res.status(402).json({
                error: 1,
                message: error.message,
                fields: error.errors,
              });
            }
            next();
          }
        });
      } else {
        let player = new Player(payload);

        await player.save();

        delete player._doc.password;
        res.status(201).json({ data: player });
      }
    } catch (error) {
      if (error && error.name === "ValidationError") {
        return res
          .status(402)
          .json({ error: 1, message: error.message, fields: error.errors });
      }
      next();
    }
  },
  signIn: async (req, res, next) => {
    const { email, password } = req.body;

    Player.findOne({ email: email })
      .then((player) => {
        if (player) {
          const checkPassword = bcrypt.compareSync(password, player.password);
          if (checkPassword) {
            const token = jwt.sign(
              {
                player: {
                  id: player.id,
                  username: player.username,
                  email: player.email,
                  name: player.name,
                  phoneNumber: player.phoneNumber,
                  avatar: player.avatar,
                },
              },
              config.jwtKey
            );

            res.status(200).json({ data: token });
          } else {
            res
              .status(403)
              .json({ message: "Password yang anda masukkan salah" });
          }
        } else {
          res.status(403).json({ message: "Email yang anda masukkan salah" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: err.message || "Internal server error" });
        next();
      });
  },
};
