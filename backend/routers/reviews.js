const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const Product = require("../models/product");

router.get(`/`, async (req, res, next) => {
   try {
      let filter = {};
      let page = 1;
      let limit = 10;
      let totalReviews = 0;
      let pageSize = 1;

      if (req.query.page) {
         page = req.query.page;
      }
      if (req.query.limit) {
         limit = req.query.limit;
      }
      //Building filter object
      if (req.query.user) {
         filter["user"] = req.query.user;
      }
      if (req.query.product) {
         filter["product"] = req.query.product;
      }
      //--------------------------------------------
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
         return res.status(404).json({
            success: false,
            message: "Page is not found!",
         });
      }
      const reviewsList = await Review.find(filter)
         .sort(req.query.sort)
         .skip((page - 1) * limit)
         .limit(limit)
         .populate(["user", "product"]);

      if (!reviewsList) {
         res.status(500).json({
            success: false,
         });
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
});

router.get(`/:id`, async (req, res, next) => {
   try {
      const review = await Review.findById(req.params.id).populate([
         "user",
         "product",
      ]);
      console.log(review);
      if (!review) {
         res.status(500).json({
            success: false,
         });
      }
      res.status(200).send(review);
   } catch (error) {
      next(error);
   }
});

router.put("/", async (req, res, next) => {
   try {
      const reviews = await Review.findOneAndUpdate(
         {
            product: req.body.product,
            user: req.body.user,
         },
         {
            product: req.body.product,
            user: req.body.user,
            bodyText: req.body.bodyText,
            rating: req.body.rating,
         },
         {
            new: true,
            runValidators: true,
            upsert: true,
         }
      );
      if (!reviews) {
         return res
            .status(404)
            .send("the reviews cannot be updated or created!");
      }

      let key = `ratings.${req.body.rating}`;
      const product = await Product.findByIdAndUpdate(req.body.product, {
         $inc: { [key]: 1 },
      });

      if (!product) {
         return res.status(404).send("rating is not accepted");
      }

      res.send(reviews);
   } catch (error) {
      next(error);
   }
});

router.post("/", async (req, res, next) => {
   try {
      let review = new Review({
         product: req.body.product,
         user: req.body.user,
         bodyText: req.body.bodyText,
         rating: req.body.rating,
      });

      review = await review.save();

      if (!review) {
         return res.status(404).send("the review cannot be created!");
      }

      let key = `ratings.${req.body.rating}`;
      const product = await Product.findByIdAndUpdate(req.body.product, {
         $inc: { [key]: 1 },
      });

      if (!product) {
         return res.status(404).send("rating is not accepted");
      }

      res.send(review);
   } catch (error) {
      next(error);
   }
});
router.delete("/", (req, res) => {
   Review.deleteMany({ _id: { $in: req.body.reviews } })
      .then((user) => {
         if (user) {
            return res
               .status(200)
               .json({ success: true, message: "The review was deleted." });
         } else {
            return res
               .status(404)
               .json({ success: false, message: "The review is not found." });
         }
      })
      .catch((err) => {
         return res.status(400).json({ success: false, error: err });
      });
});
module.exports = router;
