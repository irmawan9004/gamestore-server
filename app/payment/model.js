const mongoose = require("mongoose");
let paymentSchema = mongoose.Schema({
  type: {
    type: String,
    require: [true, "Please fill payment type please ..."],
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  banks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Banks",
  },
});

module.exports = mongoose.model("Payment", paymentSchema);