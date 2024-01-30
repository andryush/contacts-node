const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Name is required"],
    },
    email: {
      type: "string",
      required: [true, "Email is required"],
    },
    phone: {
      type: "string",
      required: [true, "Phone is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ContactSchema", contactSchema);
