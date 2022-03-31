const Player = require("./model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Payment = require("../payment/model");
const Bank = require("../bank/model");
const Nominal = require("../nominal/model");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const voucher = await Voucher.find()
        .select("_id name status category thumbnail")
        .populate("category");

      res.status(200).json({ data: voucher });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Terjadi kesalahan pada server" });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id })
        .populate("category")
        .populate("user ")
        .populate("nominals");

      if (!voucher) {
        res.status(404).json({ message: "Voucher not found" });
      } else {
        res.status(200).json({ data: voucher });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Terjadi kesalahan pada server" });
    }
  },
  category: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({ data: category });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Terjadi kesalahan pada server" });
    }
  },
  checkout: async (req, res) => {
    const { accountUser, name, nominal, voucher, payment, bank } = req.body;

    const res_voucher = await Voucher.findOne({ _id: voucher })
      .select("name category _id thumbnail user")
      .populate("category")
      .populate("user");

    if (!res_voucher)
      return res.status(404).json({ message: "voucher game tidak ditemukan" });

    const res_nominal = await Nominal.findOne({ _id: nominal });

    if (!res_nominal)
      return res.status(404).json({ message: "nominal  tidak ditemukan" });

    const res_payment = await Payment.findOne({ _id: payment });

    if (!res_payment)
      return res.status(404).json({ message: "payment  tidak ditemukan" });

    const res_bank = await Bank.findOne({ _id: bank });

    if (!res_bank)
      return res.status(404).json({ message: "bank  tidak ditemukan" });
  },
};
