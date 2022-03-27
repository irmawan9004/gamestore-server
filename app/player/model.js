const mongoose = require("mongoose");
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
      type: Number,
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

module.exports = mongoose.model("Player", playerSchema);
