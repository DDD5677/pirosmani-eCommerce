const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Please enter a name"],
   },
   email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
   },
   password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
   },
   phone: {
      type: String,
      required: [true, "Please enter a phone"],
   },
   isAdmin: {
      type: Boolean,
      default: false,
   },
   image: {
      type: String,
      default: "",
   },
   street: {
      type: String,
      default: "",
   },
   apartment: {
      type: String,
      default: "",
   },
   city: {
      type: String,
      default: "",
   },
   zip: {
      type: String,
      default: "",
   },
   country: {
      type: String,
      default: "",
   },
   orders: {
      type: Array,
      default: [],
   },
});
//user before saving
userSchema.pre("save", async function (next) {
   const salt = await bcrypt.genSalt();
   console.log(salt);
   this.password = bcrypt.hashSync(this.password, salt);
   next();
});

userSchema.virtual("id").get(function () {
   return this._id.toHexString();
});
userSchema.set("toJSON", {
   virtuals: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
