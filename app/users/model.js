const mongoose = require("mongoose");
let usersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Please fill email please ..."],
    },
    name: {
      type: String,
      require: [true, "Please fill name please ..."],
    },
    username: {
      type: String,
      require: [true, "Please fill username please ..."],
    },
    password: {
      type: String,
      require: [true, "Please fill password please ..."],
    },
    phoneNumber: {
      type: String,
      require: [true, "Please fill phoneNumber please ..."],
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", usersSchema);
