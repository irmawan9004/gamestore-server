const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const voucher = await Voucher.find();
      res.render("admin/voucher/view_voucher", { voucher, alert });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render("admin/voucher/create", { category, nominal });
    } catch (error) {
      console.log(error);
    }
  },
  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const nominal = await Nominal.findOne({ _id: id });

  //     res.render("admin/nominal/edit", { nominal });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  // actionCreate: async (req, res) => {
  //   try {
  //     const { coinName, coinQty, coinPrice } = req.body;
  //     let nominal = await Nominal({ coinName, coinQty, coinPrice });
  //     await nominal.save();
  //     req.flash("alertMessage", `Berhasil Menambahkan Nominal`);
  //     req.flash("alertStatus", "success");

  //     res.redirect("/nominal");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/nominal");
  //   }
  // },
  // actionEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { coinName, coinQty, coinPrice } = req.body;
  //     req.flash("alertMessage", `Berhasil Update Nominal`);
  //     req.flash("alertStatus", "success");

  //     await Nominal.findOneAndUpdate(
  //       { _id: id },
  //       { coinName, coinQty, coinPrice }
  //     );
  //     res.redirect("/nominal");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/nominal");
  //   }
  // },
  // actionDelete: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     await Nominal.findOneAndRemove({ _id: id });
  //     req.flash("alertMessage", `Berhasil Menghapus Nominal`);
  //     req.flash("alertStatus", "success");
  //     res.redirect("/nominal");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/nominal");
  //   }
  // },
};
