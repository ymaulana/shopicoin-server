const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, "name game must be filled"] },
      category: { type: String, require: [true, "category must be filled"] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, "coin name must be filled"] },
      coinQuantity: {
        type: String,
        require: [true, "coin quantity must be filled"],
      },
      price: { type: Number },
    },

    historyPayment: {
      name: { type: String, require: [true, "name must be filled"] },
      paymentMethod: {
        type: String,
        require: [true, "payment method be filled"],
      },
      bankName: { type: String, require: [true, "bank name must be filled"] },
      accountNumber: {
        type: String,
        require: [true, "account number be filled"],
      },
    },

    name: {
      type: String,
      require: [true, "account name must be filled"],
      maxLength: [225, "max length must between 3 - 255 character"],
      minLength: [3, "min length must between 3 - 255 character"],
    },

    accountUser: {
      type: String,
      require: [true, "account name must be filled"],
      maxLength: [225, "max length must between 3 - 255 character"],
      minLength: [3, "min length must between 3 - 255 character"],
    },

    tax: {
      type: Number,
      default: 0,
    },

    value: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },

    historyUser: {
      name: { type: String, require: [true, "player name must be filled"] },
      phoneNumber: {
        type: Number,
        require: [true, "account name must be filled"],
        maxlength: [13, "max length must between 9 - 13 character"],
        minlength: [9, "min length must between 9 - 13 character"],
      },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", transactionSchema);
