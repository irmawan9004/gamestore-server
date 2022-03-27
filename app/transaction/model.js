const mongoose = require("mongoose");
let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: {
        type: String,
        require: [true, "Please fill game name  please ..."],
      },
      category: {
        type: String,
        require: [true, "Please fill category  please ..."],
      },
      thumbnail: {
        type: String,
      },
      coinName: {
        type: String,
        require: [true, "Please fill coin name  please ..."],
      },
      coinQuantity: {
        type: String,
        require: [true, "Please fill coin qty  please ..."],
      },
      price: {
        type: Number,
      },
    },
    historyPayment: {
      name: {
        type: String,
        require: [true, "Please fill  name  please ..."],
      },
      type: {
        type: String,
        require: [true, "Please fill type  please ..."],
      },
      bankName: {
        type: String,
        require: [true, "Please fill bank name  please ..."],
      },
      accountNumber: {
        type: String,
        require: [true, "Please fill account number  please ..."],
      },
    },
    name: {
      type: String,
      require: [true, "Please fill  name  please ..."],
      maxlength: [225, "nama harus 3-225 karakter"],
      minlength: [3, "nama harus 3-225 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "Please fill  account name  please ..."],
      maxlength: [225, "nama harus 3-225 karakter"],
      minlength: [3, "nama harus 3-225 karakter"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    historyUser: {
      name: {
        type: String,
        require: [true, "Please fill  name  please ..."],
      },
      phoneNumber: {
        type: Number,
        require: [true, "Please fill  phone number  please ..."],
        maxlength: [13, "phone number harus 9-13 karakter"],
        minlength: [9, "phone number harus 9-13 karakter"],
      },
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
