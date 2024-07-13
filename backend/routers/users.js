const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user.controller");
const upload = require("../helpers/upload");

router.get(`/`, userController.getUser);
router.get("/:id", userController.getOneUser);
router.post("/", upload().single("user_image"), userController.createUser);

router.get("/get/user", async (req, res, next) => {
   try {
      let token;
      let currentUser;
      const secret = process.env.secret;
      console.log("token", req.headers["authorization"]);
      if (
         req.headers["authorization"] &&
         req.headers["authorization"].split(" ")[0] === "Bearer"
      ) {
         token = req.headers["authorization"].split(" ")[1];
      } else {
         console.log("token is not found");
      }
      jwt.verify(token, secret, function (err, decoded) {
         if (err) {
            console.log("Error: ", err);
         }
         currentUser = decoded;
      });
      const user = await User.findById(currentUser.userId).select("-password");

      if (!user) {
         res.status(500).json({
            message: "The user with the given ID was not found.",
         });
      }

      res.status(200).send({ user: user });
   } catch (error) {
      next(error);
   }
});

router.put("/:id", upload().single("user_image"), userController.updateUser);
router.delete("/", userController.deleteUser);
router.get(`/get/count`, userController.getUserCount);

module.exports = router;
