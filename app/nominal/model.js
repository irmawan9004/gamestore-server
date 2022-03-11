const mongoose = require("mongoose");
let nominalSchema = mongoose.Schema({
  itemQty: {
    type: Number,
    default: 0,
  },
  itemName: {
    type: String,
    require: [true, "Please fill item name please ..."],
  },
  itemPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Nominal", nominalSchema);
