const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find();
      res.render("admin/payment/view_payment", { payment, alert });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const bank = await Bank.find();
      res.render("admin/payment/create", { bank });
    } catch (error) {
      console.log(error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });

      res.render("admin/nominal/edit", { nominal });
    } catch (error) {
      console.log(error);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;
      let payment = await Payment({ type, banks });
      await payment.save();
      req.flash("alertMessage", `Berhasil Menambahkan Payment`);
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
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
