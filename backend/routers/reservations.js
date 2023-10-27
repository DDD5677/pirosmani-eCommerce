const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");

router.get(`/`, async (req, res, next) => {
   try {
      const reservation = await Reservation.find({});
      if (!reservation) {
         res.status(500).json({
            success: false,
         });
      }
      res.send(reservation);
   } catch (error) {
      next(error);
   }
});

router.post("/", async (req, res, next) => {
   try {
      let reservation = new Reservation({
         user: req.body.user,
         name: req.body.name,
         phone: req.body.phone,
         numOfPeople: req.body.numOfPeople,
         time: req.body.time,
         date: req.body.date,
      });

      reservation = await reservation.save();

      if (!reservation) {
         return res.status(404).send("the reservation cannot be created!");
      }

      res.send(reservation);
   } catch (error) {
      next(error);
   }
});

module.exports = router;
