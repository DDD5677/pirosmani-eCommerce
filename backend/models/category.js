const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please enter name of category"],
      },
      image: {
         type: String,
         required: [true, "Please select image"],
      },
      icon: {
         type: String,
         required: [true, "Please select icon"],
      },
   },
   { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
