const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      name: {
         type: String,
         required: [true, "Please enter your name."],
      },
      phone: {
         type: String,
         required: [true, "Please enter your phone."],
      },
      numOfPeople: {
         type: Number,
         required: [true, "Please enter number of people."],
      },
      time: {
         type: String,
         required: [true, "Please enter time."],
      },
      status: {
         type: String,
         required: true,
         default: "Pending",
      },
      date: {
         type: String,
         required: [true, "Please enter date."],
      },
   },
   { timestamps: true }
);

reservationSchema.virtual("id").get(function () {
   return this._id.toHexString();
});
reservationSchema.set("toJSON", {
   virtuals: true,
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
