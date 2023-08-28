const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authErrors = (err) => {
   console.log(err.message, err.code);
   let errors = {
      name: "",
      email: "",
      password: "",
      phone: "",
   };
   if (err.code === 11000) {
      errors.email = "that email is already registered";
      console.log(errors);
      return errors;
   }
   if (err.message.includes("User validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
         errors[properties.path] = properties.message;
      });
   }

   return errors;
};

router.get(`/`, async (req, res) => {
   const userList = await User.find({}).select("-password");

   if (!userList) {
      res.status(500).json({
         success: false,
      });
   }
   res.send(userList);
});

// router.get("/:id", async (req, res) => {
//    const user = await User.findById(req.params.id).select("-password");

//    if (!user) {
//       res.status(500).json({
//          message: "The user with the given ID was not found.",
//       });
//    }

//    res.status(200).send(user);
// });

router.post("/", async (req, res) => {
   let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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

router.get("/get/user", async (req, res) => {
   try {
      let token;
      let currentUser;
      const secret = process.env.secret;
      console.log(req.headers["authorization"]);
      if (
         req.headers["authorization"] &&
         req.headers["authorization"].split(" ")[0] === "Bearer"
      ) {
         token = req.headers["authorization"].split(" ")[1];
         console.log("token in if");
      } else {
         console.log("token is not found");
      }
      jwt.verify(token, secret, function (err, decoded) {
         if (err) {
            console.log("Error: ", err);
         }
         currentUser = decoded;
      });
      const user = await User.findById(currentUser.userId).select(
         "-passwordHash"
      );

      if (!user) {
         res.status(500).json({
            message: "The user with the given ID was not found.",
         });
      }

      res.status(200).send({ user: user, token: token });
   } catch (error) {
      console.log(error);
      res.send(error);
   }
});

router.post("/login", async (req, res) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      const secret = process.env.secret;

      if (!user) {
         return res.status(400).send("the user not found");
      }

      if (user && bcrypt.compareSync(req.body.password, user.password)) {
         const token = jwt.sign(
            {
               userId: user.id,
               isAdmin: user.isAdmin,
            },
            secret,
            {
               expiresIn: "1d",
            }
         );
         res.status(200).send({ user: user, token: token });
      } else {
         res.status(400).send("password is wrong");
      }
   } catch (error) {
      res.status(500).json(error);
   }
});

router.post("/register", async (req, res) => {
   try {
      let user = new User({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
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

      res.status(200).send(user);
   } catch (error) {
      console.log(error);
      const errors = authErrors(error);
      console.log(errors);
      res.status(500).json(errors);
   }
});

router.put("/:id", async (req, res) => {
   const userExist = await User.findById(req.params.id);
   let newPassword;
   if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10);
   } else {
      newPassword = userExist.passwordHash;
   }

   const user = await User.findByIdAndUpdate(
      req.params.id,
      {
         name: req.body.name,
         email: req.body.email,
         passwordHash: newPassword,
         isAdmin: req.body.isAdmin,
         phone: req.body.phone,
         image: req.body.image,
         street: req.body.street,
         apartment: req.body.apartment,
         city: req.body.city,
         zip: req.body.zip,
         country: req.body.country,
      },
      { new: true }
   );

   if (!user) return res.status(400).send("the user cannot be created!");

   res.send(user);
});

router.delete("/:id", (req, res) => {
   User.findByIdAndRemove(req.params.id)
      .then((user) => {
         if (user) {
            return res
               .status(200)
               .json({ success: true, message: "The user was deleted." });
         } else {
            return res
               .status(404)
               .json({ success: false, message: "The user is not found." });
         }
      })
      .catch((err) => {
         return res.status(400).json({ success: false, error: err });
      });
});

router.get(`/get/count`, async (req, res) => {
   const userCount = await User.countDocuments();

   if (!userCount) {
      res.status(500).json({
         success: false,
      });
   }
   res.send({
      userCount: userCount,
   });
});

module.exports = router;
