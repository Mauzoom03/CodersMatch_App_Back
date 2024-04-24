const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  surname: { type: String, trim: true, required: true },
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  token: { type: String, trim: false, required: false },
  email: { type: String, trim: true, required: true },
  confirmed: { type: Boolean, trim: false, required: false, default: false },
  isAdmin: { type: Boolean, trim: false, required: false, default: false },
  image: { type: String, trim: false, required: false, default: null },
  description: { type: String, trim: true, required: false },
  sexo: { type: String, enum: ["hombre", "mujer", "otro"], default: "otro" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  status: {
    type: String,
    enum: ["active", "inactive", "blocked"],
    default: "active",
  },
  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.passwordCheck = async function (formPassword) {
  return bcrypt.compare(formPassword, this.password);
};

const User = mongoose.model("users", userSchema);
module.exports = User;
