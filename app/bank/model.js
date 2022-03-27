const mongoose = require("mongoose");
let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please fill account name"],
    },
    bankName: {
      type: String,
      require: [true, "Please fill bank name"],
    },
    noRekening: {
      type: Number,
      require: [true, "Please fill account number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
