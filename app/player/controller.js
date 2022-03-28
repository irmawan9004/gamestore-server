const Player = require("./model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

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
};
