const mongoose = require("mongoose");
let paymentSchema = mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      require: [true, "payment method must be filled"],
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    banks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bank",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Payment", paymentSchema);
