const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");

router.get(`/`, async (req, res) => {
   const reservation = await Reservation.find({});

   if (!reservation) {
      res.status(500).json({
         success: false,
      });
   }
   res.send(reservation);
});

module.exports = router;
