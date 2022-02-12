const mongoose = require("mongoose");
let categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name must be filled!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
