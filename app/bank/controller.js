const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();

      console.log(bank);

      res.render("admin/bank/view_bank", {
        bank,
        alert,
        name: req.session.user.name,
        title: "Bank Pages",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        name: req.session.user.name,
        title: "Add Bank Account Pages",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, bankName, accountNumber } = req.body;
      let bank = await Bank({ name, bankName, accountNumber });
      await bank.save();

      req.flash("alertMessage", "input bank has been succeeded");
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });

      res.render("admin/bank/edit", {
        bank,
        name: req.session.user.name,
        title: "Edit Bank Account Pages",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, accountNumber } = req.body;

      const bank = await Bank.findOneAndUpdate(
        { _id: id },
        { name, bankName, accountNumber }
      );

      req.flash("alertMessage", "account has been updated");
      req.flash("alertStatus", "success");

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

      req.flash("alertMessage", "bank account has been deleted");
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
};
