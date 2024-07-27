import mongoose from "mongoose";
import { defaultDP } from "../Utility/constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let { Schema, model } = mongoose;

let userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: defaultDP },
  refreshToken: { type: String },
}, {timestamps : true });
// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generating the salt
    const hashedPassword = await bcrypt.hash(user.password, salt); // Generating hashed password
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});
// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  let user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};
// Method to generate access and refresh tokens
userSchema.methods.generateToken = async function () {
  const user = this;
  try {
    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_KEY,
      { expiresIn: process.env.ACCESS_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { _id: user._id, email: user.email, userName: user.userName },
      process.env.REFRESH_KEY,
      { expiresIn: process.env.REFRESH_EXPIRY }
    );

    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error("Error generating tokens");
  }
};

let User = model("User", userSchema);

export default User;
