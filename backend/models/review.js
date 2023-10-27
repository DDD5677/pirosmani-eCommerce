const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
   {
      product: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Product",
         required: true,
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      bodyText: {
         type: String,
         required: [true, "Please enter a review"],
      },
      rating: {
         type: Number,
         required: [true, "Please rate the product"],
      },
      status: {
         type: String,
         required: true,
         default: "Pending",
      },
   },
   { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
