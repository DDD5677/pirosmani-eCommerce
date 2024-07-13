const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const upload = require("../helpers/upload");

router.get(`/`, categoryController.getCategory);
router.get("/:id", categoryController.getOneCategory);
router.post(
   "/",
   upload().fields([
      { name: "category_image", maxCount: 1 },
      { name: "category_icon", maxCount: 1 },
   ]),
   categoryController.createCategory
);
router.put(
   "/:id",
   upload().fields([
      { name: "category_image", maxCount: 1 },
      { name: "category_icon", maxCount: 1 },
   ]),
   categoryController.updateCategory
);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
