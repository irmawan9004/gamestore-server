const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const HASH_ROUMD = 10;
let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Please fill email please ..."],
    },
    name: {
      type: String,
      require: [true, "Please fill name please ..."],
      maxlength: [225, "nama harus 3-225 karakter"],
      minlength: [3, "nama harus 3-225 karakter"],
    },
    username: {
      type: String,
      require: [true, "Please fill username please ..."],
      maxlength: [225, "username harus 3-225 karakter"],
      minlength: [3, "username harus 3-225 karakter"],
    },
    password: {
      type: String,
      require: [true, "Please fill password please ..."],
      maxlength: [225, "password maksimal 225 karakter"],
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    phoneNumber: {
      type: String,
      require: [true, "Please fill phoneNumber please ..."],
      maxlength: [13, "phoneNumber harus 9-13 karakter"],
      minlength: [9, "phoneNumber harus 9-13 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);
playerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUMD);
  next();
});

module.exports = mongoose.model("Player", playerSchema);
