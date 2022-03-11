const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const nominal = await Nominal.find();
      res.render("admin/nominal/view_nominal", { nominal, alert });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create");
    } catch (error) {
      console.log(error);
    }
  },
  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const category = await Category.findOne({ _id: id });

  //     res.render("admin/category/edit", { category });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQty, coinPrice } = req.body;
      let nominal = await Nominal({ coinName, coinQty, coinPrice });
      await nominal.save();
      req.flash("alertMessage", `Berhasil Menambahkan Nominal`);
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  // actionEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { name } = req.body;
  //     req.flash("alertMessage", `Berhasil Update Category`);
  //     req.flash("alertStatus", "success");

  //     await Category.findOneAndUpdate({ _id: id }, { name });
  //     res.redirect("/category");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/category");
  //   }
  // },
  // actionDelete: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const category = await Category.findOneAndRemove({ _id: id });
  //     req.flash("alertMessage", `Berhasil Menghapus Category`);
  //     req.flash("alertStatus", "success");

  //     res.redirect("/category");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/category");
  //   }
  // },
};
