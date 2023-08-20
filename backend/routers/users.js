const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get(`/`, async (req, res) => {
   const userList = await User.find({});

   if (!userList) {
      res.status(500).json({
         success: false,
      });
   }
   res.send(userList);
});

router.post("/", async (req, res) => {
   let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.passwordHash,
      isAdmin: req.body.isAdmin,
      phone: req.body.phone,
      image: req.body.image,
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
   });

   user = await user.save();

   if (!user) {
      return res.status(404).send("the user cannot be created!");
   }

   res.send(user);
});

module.exports = router;
