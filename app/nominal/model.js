const mongoose = require("mongoose");
let nominalSchema = mongoose.Schema({
  coinQty: {
    type: Number,
    default: 0,
  },
  coinName: {
    type: String,
    require: [true, "Please fill item name please ..."],
  },
  coinPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Nominal", nominalSchema);
