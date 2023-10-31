const express = require("express");
const router = express.Router();
const Info = require("../models/info");
const { default: mongoose } = require("mongoose");

router.get("/", async (req, res, next) => {
   try {
      const info = await Info.find();

      if (!info) {
         res.status(500).json({
            success: false,
            msg: "Information is not found",
         });
      }

      res.status(200).send(info);
   } catch (error) {
      next(error);
   }
});

router.post("/", async (req, res, next) => {
   try {
      let postBlock = {
         mainPhone: req.body.mainPhone,
         orderPhone: req.body.orderPhone,
         video: req.body.video,
         telegram: req.body.telegram,
         instagram: req.body.instagram,
         email: req.body.email,
         workingTimeFrom: req.body.workingTimeFrom,
         workingTimeTo: req.body.workingTimeTo,
      };

      let info = new Info(postBlock);
      info = await info.save();

      if (!info) {
         return res.status(404).send("the info cannot be created");
      }

      res.status(200).send(info);
   } catch (error) {
      next(error);
   }
});

router.put("/:id", async (req, res, next) => {
   try {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).send("Invalid ID");
      }

      const info = await Info.findByIdAndUpdate(
         req.params.id,
         {
            mainPhone: req.body.mainPhone,
            orderPhone: req.body.orderPhone,
            video: req.body.video,
            telegram: req.body.telegram,
            instagram: req.body.instagram,
            email: req.body.email,
            workingTimeFrom: req.body.workingTimeFrom,
            workingTimeTo: req.body.workingTimeTo,
         },
         { new: true }
      );

      if (!info) {
         return res.status(404).send("the info cannot be updated");
      }

      res.status(200).send(info);
   } catch (error) {
      next(error);
   }
});

module.exports = router;
