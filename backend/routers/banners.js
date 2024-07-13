const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner.controller");
const upload = require("../helpers/upload");

router.get(`/`, bannerController.getBanner);
router.get("/:id", bannerController.getOneBanner);
router.post(
   "/",
   upload().single("banner_image"),
   bannerController.createBanner
);
router.put(
   "/:id",
   upload().single("banner_image"),
   bannerController.updateBanner
);
router.delete("/:id", bannerController.deleteBanner);
module.exports = router;
