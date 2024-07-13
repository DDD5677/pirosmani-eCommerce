const { default: mongoose } = require("mongoose");
const Banner = require("../models/banner");
const fs = require("fs");
const path = require("path");
const BaseError = require("../helpers/base.error");

class BannerController {
   async getBanner(req, res, next) {
      try {
         const banner = await Banner.find({});

         if (!banner) {
            throw BaseError.NotFound("Banners are not found");
         }
         res.status(200).send(banner);
      } catch (error) {
         next(error);
      }
   }

   async getOneBanner(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Banner ID");
         }
         const banner = await Banner.findById(req.params.id);

         if (!banner) {
            throw BaseError.NotFound(
               "The banner with the given ID was not found."
            );
         }

         res.status(200).send(banner);
      } catch (error) {
         next(error);
      }
   }

   async createBanner(req, res, next) {
      try {
         let postBlock = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            link: req.body.link,
            button: req.body.button,
         };
         const file = req.file;

         if (file) {
            postBlock["image"] =
               req.file.destination.slice(1) + "/" + req.file.filename;
         }
         let banner = new Banner(postBlock);

         banner = await banner.save();

         if (!banner) {
            throw BaseError.BadRequest("Banner is not created");
         }

         res.status(200).send(banner);
      } catch (error) {
         next(error);
      }
   }

   async updateBanner(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Banner ID");
         }
         let updateBlock = {};
         const file = req.file;

         if (req.body.title) {
            updateBlock["title"] = req.body.title;
         }
         if (req.body.subtitle) {
            updateBlock["subtitle"] = req.body.subtitle;
         }
         if (req.body.link) {
            updateBlock["link"] = req.body.link;
         }
         if (req.body.button) {
            updateBlock["button"] = req.body.button;
         }
         if (file) {
            const bannerInfo = await Banner.findById(req.params.id);
            if (bannerInfo.image) {
               const result = path.join(process.cwd(), bannerInfo.image);

               if (fs.existsSync(result)) {
                  fs.unlinkSync(result);
               }
            }
            updateBlock["image"] =
               file.destination.slice(1) + "/" + file.filename;
         }
         const banner = await Banner.findByIdAndUpdate(
            req.params.id,
            updateBlock,
            { new: true }
         );
         if (!banner) {
            throw BaseError.BadRequest("The banner is not updated");
         }

         res.status(200).send(banner);
      } catch (error) {
         next(error);
      }
   }

   async deleteBanner(req, res, next) {
      if (!mongoose.isValidObjectId(req.params.id)) {
         throw BaseError.BadRequest("Invalid Banner ID");
      }
      Banner.findByIdAndRemove(req.params.id)
         .then((banner) => {
            if (banner) {
               if (banner.image) {
                  const result = path.join(process.cwd(), banner.image);
                  if (fs.existsSync(result)) {
                     fs.unlinkSync(result);
                  }
               }
               return res
                  .status(200)
                  .json({ success: true, message: "The banner was deleted." });
            } else {
               throw BaseError.BadRequest("The banner is not deleted");
            }
         })
         .catch((error) => {
            next(error);
         });
   }
}

module.exports = new BannerController();
