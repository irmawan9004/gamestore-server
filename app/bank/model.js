const mongoose = require("mongoose");
let bankSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please fill account name"],
  },
  bankName: {
    type: String,
    require: [true, "Please fill bank name"],
  },
  accountNumber: {
    type: Number,
    require: [true, "Please fill account number"],
  },
});

module.exports = mongoose.model("Bank", bankSchema);
