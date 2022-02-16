const mongoose = require("mongoose");
let voucherSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Game name must be filled"],
  },
  status: {
    type: String,
    enum: ["Y", "N"], //active & non-active
    default: "Y",
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  nominals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominal",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
});

module.exports = mongoose.model("Voucher", voucherSchema);
