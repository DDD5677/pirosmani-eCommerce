const { default: mongoose } = require("mongoose");
const Review = require("../models/review");
const Product = require("../models/product");
const BaseError = require("../helpers/base.error");
class ReviewController {
   async getReview(req, res, next) {
      try {
         let filter = {};
         let page = 1;
         let limit = 10;
         let totalReviews = 0;
         let pageSize = 1;

         if (req.query.page) {
            page = +req.query.page;
         }
         if (req.query.limit) {
            limit = +req.query.limit;
         }
         const skip = (page - 1) * limit;
         //Building filter object

         if (req.query.date) {
            if (req.query.date.lte) {
               filter.createdAt = {
                  ...filter.createdAt,
                  lte: req.query.date.lte,
               };
            }
            if (req.query.date.gte) {
               filter.createdAt = {
                  ...filter.createdAt,
                  gte: req.query.date.gte,
               };
            }
         }
         if (req.query.user) {
            if (!mongoose.isValidObjectId(req.query.user)) {
               throw BaseError.BadRequest("Invalid User ID");
            }
            filter["user"] = req.query.user;
         }

         if (req.query.status) {
            filter["status"] = req.query.status;
         }
         if (req.query.search) {
            filter = {
               $or: [{ bodyText: { $regex: req.query.search, $options: "i" } }],
            };
         }
         if (req.query.rating) {
            filter["rating"] = { gte: req.query.rating };
         }
         //------------------------------------------
         let queryStr = JSON.stringify(filter);
         queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
         );
         filter = JSON.parse(queryStr);
         //--------------------------------------------
         if (req.query.product) {
            filter["product"] = new mongoose.Types.ObjectId(req.query.product);
         }
         //--------------------------------------------
         let sort = {};
         if (req.query.sort) {
            const key = req.query.sort;
            if (req.query.sort[0] === "-") {
               sort[`${key.substring(1)}`] = -1;
               sort["_id"] = 1;
            } else {
               sort[`${key}`] = 1;
               sort["_id"] = 1;
            }
         } else {
            sort.dateCreated = 1;
         }
         //---------------------------------------------

         totalReviews = await Review.countDocuments(filter).exec();
         if (!totalReviews) {
            return res.status(200).json({
               reviewsList: [],
               pagination: {
                  pageSize: pageSize,
                  limit: limit,
                  page: page,
               },
            });
         }
         pageSize = Math.ceil(totalReviews / limit);
         if (page > pageSize) {
            throw BaseError.NotFound("Page is not found");
         }
         const reviewsList = await Review.aggregate([
            {
               $match: filter,
            },
            {
               $lookup: {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
                  as: "user",
               },
            },
            {
               $unwind: "$user",
            },
            {
               $lookup: {
                  from: "products",
                  localField: "product",
                  foreignField: "_id",
                  as: "product",
               },
            },
            {
               $unwind: "$product",
            },
            {
               $sort: sort,
            },
            { $skip: skip },
            { $limit: limit },
         ]);

         if (!reviewsList) {
            throw BaseError.NotFound("The reviews are not found");
         }
         res.status(200).send({
            reviewsList: reviewsList,
            pagination: {
               pageSize: pageSize,
               limit: limit,
               page: page,
            },
         });
      } catch (error) {
         next(error);
      }
   }

   async getOneReview(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Review ID");
         }
         const review = await Review.findById(req.params.id).populate([
            "user",
            "product",
         ]);

         if (!review) {
            throw BaseError.NotFound("The review with given id is not found");
         }
         res.status(200).send(review);
      } catch (error) {
         next(error);
      }
   }

   async updateReview(req, res, next) {
      try {
         let updateBlock = {};
         let filter = {};
         //create filter
         if (req.body.id) {
            filter["_id"] = req.body.id;
         }
         if (req.body.product) {
            filter["product"] = req.body.product;
         }
         if (req.body.user) {
            filter["user"] = req.body.user;
         }
         //create updateBlock
         if (req.body.rating) {
            updateBlock["rating"] = req.body.rating;

            let key = `ratings.${req.body.rating}`;
            const product = await Product.findByIdAndUpdate(req.body.product, {
               $inc: { [key]: 1 },
            });

            if (!product) {
               throw BaseError.BadRequest("The rating is not updated");
            }
         }

         if (req.body.bodyText) {
            updateBlock["bodyText"] = req.body.bodyText;
         }
         if (req.body.status) {
            updateBlock["status"] = req.body.status;
         }

         const reviews = await Review.findOneAndUpdate(filter, updateBlock, {
            new: true,
            runValidators: true,
            upsert: true,
         });
         if (!reviews) {
            throw BaseError.BadRequest("The reviews are not updated");
         }

         res.status(200).send(reviews);
      } catch (error) {
         next(error);
      }
   }
   //refactor code and next() function
   deleteReview(req, res, next) {
      Review.deleteMany({ _id: { $in: req.body.reviews } })
         .then((review) => {
            if (review) {
               return res
                  .status(200)
                  .json({ success: true, message: "The review was deleted." });
            } else {
               throw BaseError.BadRequest("The review is not deleted");
            }
         })
         .catch((error) => {
            next(error);
         });
   }
}

module.exports = new ReviewController();
