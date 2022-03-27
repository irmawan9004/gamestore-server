const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Player = require("../player/model");
const Transaction = require("../transaction/model");

module.exports = {
  index: async (req, res) => {
    try {
      const voucher = await Voucher.countDocuments();
      const category = await Category.countDocuments();
      const player = await Player.countDocuments();
      const transaction = await Transaction.countDocuments();
      controller = res.render("admin/dashboard/view_dashboard", {
        name: req.session.user.name,
        title: "Halaman Dashboard",
        count: {
          voucher,
          category,
          player,
          transaction,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
