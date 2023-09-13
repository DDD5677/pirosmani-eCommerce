const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   numOfPeople: {
      type: Number,
      required: true,
   },
   time: {
      type: String,
      required: true,
   },
   date: {
      type: String,
      required: true,
   },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
