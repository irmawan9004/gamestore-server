const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();
      res.render("admin/bank/view_bank", { bank, alert });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create");
    } catch (error) {
      console.log(error);
    }
  },
  //   viewEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const category = await Category.findOne({ _id: id });

  //       res.render("admin/category/edit", { category });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },

  actionCreate: async (req, res) => {
    try {
      const { name, bankName, accountName } = req.body;
      let bank = await Bank({ name, bankName, accountName });
      await bank.save();
      req.flash("alertMessage", `Berhasil Menambahkan Bank`);
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  //   actionEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { name } = req.body;
  //       req.flash("alertMessage", `Berhasil Update Category`);
  //       req.flash("alertStatus", "success");

  //       await Category.findOneAndUpdate({ _id: id }, { name });
  //       res.redirect("/category");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     }
  //   },
  //   actionDelete: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const category = await Category.findOneAndRemove({ _id: id });
  //       req.flash("alertMessage", `Berhasil Menghapus Category`);
  //       req.flash("alertStatus", "success");

  //       res.redirect("/category");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     }
  //   },
};
