const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    profile: { type: String, require: true, default: "user.png" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
