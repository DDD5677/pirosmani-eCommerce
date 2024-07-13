const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

router.get(`/`, reviewController.getReview);
router.get(`/:id`, reviewController.getOneReview);
router.put("/", reviewController.updateReview);
router.delete("/", reviewController.deleteReview);

// router.post("/", async (req, res, next) => {
//    try {
//       let review = new Review({
//          product: req.body.product,
//          user: req.body.user,
//          bodyText: req.body.bodyText,
//          rating: req.body.rating,
//       });

//       review = await review.save();

//       if (!review) {
//          return res.status(404).send("the review cannot be created!");
//       }

//       let key = `ratings.${req.body.rating}`;
//       const product = await Product.findByIdAndUpdate(req.body.product, {
//          $inc: { [key]: 1 },
//       });

//       if (!product) {
//          return res.status(404).send("rating is not accepted");
//       }

//       res.send(review);
//    } catch (error) {
//       next(error);
//    }
// });

module.exports = router;
