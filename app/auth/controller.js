const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

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
};
