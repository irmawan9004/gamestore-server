const mongoose = require("mongoose");
let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please fill category name"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
