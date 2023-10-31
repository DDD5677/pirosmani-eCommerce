const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, "Please enter title"],
      },
      subtitle: {
         type: String,
         required: [true, "Please enter subtitle"],
      },
      link: {
         type: String,
         required: [true, "Please enter link"],
      },
      image: {
         type: String,
         required: [true, "Please select image"],
      },
   },
   { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
