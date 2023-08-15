const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   dsc: {
      type: String,
      required: true,
   },
   richDsc: {
      type: String,
      default: "",
   },
   img: {
      type: String,
      default: "",
   },
   images: [
      {
         type: String,
      },
   ],
   brand: {
      type: String,
      default: "",
   },
   price: {
      type: Number,
      default: 0,
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
   },
   countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
   },
   rate: {
      type: Number,
      default: 0,
   },
   numReviews: {
      type: Number,
      default: 0,
   },
   isFeatured: {
      type: Boolean,
      default: false,
   },
   dateCreated: {
      type: Date,
      default: Date.now,
   },
});

productSchema.virtual("id").get(function () {
   return this._id.toHexString();
});
productSchema.set("toJSON", {
   virtuals: true,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;