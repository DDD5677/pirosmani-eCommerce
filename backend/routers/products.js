const express = require("express");
const router = express.Router();
const { authAdmin } = require("../helpers/jwt");
const productController = require("../controllers/product.controller");
const upload = require("../helpers/upload");

router.get(`/`, productController.getProduct);
router.get(`/:id`, productController.getOneProduct);
router.post(
   `/`,
   upload().single("product_image"),
   productController.createProduct
);
router.put(
   "/:id",
   upload().single("product_image"),
   productController.updateProduct
);
router.delete("/", productController.deleteProduct);
router.get(`/get/count`, productController.getProductCount);
router.get(`/get/featured/:count`, productController.getFeaturedProductCount);
router.put(
   "/gallery-images/:id",
   // uploadOptions.array("images", 10),
   productController.updateProductGallery
);

module.exports = router;
