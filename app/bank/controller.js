const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();
      res.render("admin/bank/view_bank", {
        bank,
        alert,
        name: req.session.user.name,
        title: "Halaman Bank",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        name: req.session.user.name,
        title: "Halaman Create Bank",
      });
    } catch (error) {
      console.log(error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });

      res.render("admin/bank/edit", {
        bank,
        name: req.session.user.name,
        title: "Halaman Edit Bank",
      });
    } catch (error) {
      console.log(error);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, bankName, noRekening } = req.body;
      let bank = await Bank({ name, bankName, noRekening });
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
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, noRekening } = req.body;
      req.flash("alertMessage", `Berhasil Update Bank`);
      req.flash("alertStatus", "success");

      await Bank.findOneAndUpdate({ _id: id }, { name, noRekening, bankName });
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOneAndRemove({ _id: id });
      req.flash("alertMessage", `Berhasil Menghapus Bank`);
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
};
