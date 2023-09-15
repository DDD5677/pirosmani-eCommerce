const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");

const reservationErrors = (err) => {
   console.log(err.errors, err.code);
   let errors = {};
   if (err.name.includes("ValidationError")) {
      Object.values(err.errors).forEach(({ properties }) => {
         errors[properties.path] = properties.message;
      });
   }

   return errors;
};

router.get(`/`, async (req, res) => {
   const reservation = await Reservation.find({});

   if (!reservation) {
      res.status(500).json({
         success: false,
      });
   }
   res.send(reservation);
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
      // const errors = reservationErrors(error);
      // res.status(500).json(error);
   }
});

module.exports = router;
