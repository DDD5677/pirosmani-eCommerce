const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const Product = require("../models/product");

router.get(`/`, async (req, res) => {
   try {
      const reviewsList = await Review.find({}).populate(["user", "product"]);

      if (!reviewsList) {
         res.status(500).json({
            success: false,
         });
      }
      res.send(reviewsList);
   } catch (error) {
      res.status(500).json({ error });
   }
});

router.get(`/:id`, async (req, res) => {
   try {
      const reviewsList = await Review.find({
         product: req.params.id,
      }).populate(["user", "product"]);

      if (!reviewsList) {
         res.status(500).json({
            success: false,
         });
      }
      res.send(reviewsList);
   } catch (error) {
      res.status(500).json({ error });
   }
});

router.put("/", async (req, res) => {
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

      res.send(reviews);
   } catch (error) {
      res.status(500).json({ error });
   }
});

router.post("/", async (req, res, next) => {
   try {
      let key = `ratings.${req.body.rating}`;
      const product = await Product.findByIdAndUpdate(req.body.product, {
         $inc: { [key]: 1 },
      });

      if (!product) {
         return res.status(404).send("rating is not accepted");
      }

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

      res.send(review);
   } catch (error) {
      next(error);
   }
});

module.exports = router;
