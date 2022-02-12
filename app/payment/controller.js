const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate("banks");

      res.render("admin/payment/view_payment", {
        payment,
        alert,
        name: req.session.user.name,
        title: "Payment Method Pages",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render("admin/payment/create", {
        banks,
        name: req.session.user.name,
        title: "Add Payment Method Pages",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { banks, paymentMethod } = req.body;
      let payment = await Payment({ banks, paymentMethod });
      await payment.save();

      req.flash("alertMessage", "input payment method has been succeeded");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id }).populate("banks");
      const banks = await Bank.find();

      res.render("admin/payment/edit", {
        payment,
        banks,
        name: req.session.user.name,
        title: "Edit Payment Method Pages",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { paymentMethod, banks } = req.body;

      const payment = await Payment.findOneAndUpdate(
        { _id: id },
        { paymentMethod, banks }
      );

      req.flash("alertMessage", "payment options has been updated");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOneAndRemove({ _id: id });

      req.flash("alertMessage", "payment has been deleted");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let payment = await Payment.findOne({ _id: id });
      let status = payment.status === "Y" ? "N" : "Y";

      payment = await Payment.findOneAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", "status has been changed");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
