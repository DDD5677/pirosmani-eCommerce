const mongoose = require("mongoose");
const { isEmail } = require("validator");

const infoSchema = new mongoose.Schema(
   {
      mainPhone: {
         type: String,
         required: [true, "Please enter a main phone"],
      },
      orderPhone: {
         type: String,
         required: [true, "Please enter a phone for orders"],
      },
      video: {
         type: String,
         required: [true, "Please enter a youtube video link"],
      },
      telegram: {
         type: String,
      },
      instagram: {
         type: String,
      },
      email: {
         type: String,
         required: [true, "Please enter an email"],
         lowercase: true,
         validate: [isEmail, "Please enter a valid email"],
      },
      workingTimeFrom: {
         type: String,
      },
      workingTimeTo: {
         type: String,
      },
   },
   { timestamps: true }
);

const Info = mongoose.model("Info", infoSchema);
module.exports = Info;
