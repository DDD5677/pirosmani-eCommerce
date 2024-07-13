const { default: mongoose } = require("mongoose");
const Info = require("../models/info");
const BaseError = require("../helpers/base.error");

class InfoController {
   async getInfo(req, res, next) {
      try {
         const info = await Info.find();

         if (!info) {
            throw BaseError.NotFound("Informations are not found");
         }

         res.status(200).send(info);
      } catch (error) {
         next(error);
      }
   }

   async createInfo(req, res, next) {
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
            throw BaseError.BadRequest("Information is not created");
         }

         res.status(200).send(info);
      } catch (error) {
         next(error);
      }
   }

   async updateInfo(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Info ID");
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
            throw BaseError.BadRequest("The information is not updated");
         }

         res.status(200).send(info);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new InfoController();
