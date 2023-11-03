const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Category = require("../models/category");
const multer = require("multer");
const mongoose = require("mongoose");
const FILE_TYPE_MAP = {
   "image/png": "png",
   "image/jpeg": "jpeg",
   "image/jpg": "jpg",
   "image/webp": "webp",
   "image/svg+xml": "svg",
};

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error("invalid image type");
      if (isValid) {
         uploadError = null;
      }
      cb(uploadError, "public/categories");
   },
   filename: function (req, file, cb) {
      const fileName = file.originalname.split(" ").join("-");
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`);
   },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res, next) => {
   try {
      const categoryList = await Category.find({});

      if (!categoryList) {
         res.status(500).json({
            success: false,
         });
      }
      res.status(200).send(categoryList);
   } catch (error) {
      next(error);
   }
});

router.get("/:id", async (req, res, next) => {
   try {
      const category = await Category.findById(req.params.id);

      if (!category) {
         res.status(500).json({
            message: "The category with the given ID was not found.",
         });
      }

      res.status(200).send(category);
   } catch (error) {
      next(error);
   }
});

router.post(
   "/",
   uploadOptions.fields([
      { name: "image", maxCount: 1 },
      { name: "icon", maxCount: 1 },
   ]),
   async (req, res, next) => {
      try {
         let postBlock = {
            name: req.body.name,
         };
         const file = req.files;
         const basePath = `${req.protocol}://${req.get(
            "host"
         )}/public/categories/`;

         if (file.image) {
            const fileName = file.image[0].filename;
            postBlock["image"] = `${basePath}${fileName}`;
         }
         if (file.icon) {
            const fileName = file.icon[0].filename;
            postBlock["icon"] = `${basePath}${fileName}`;
         }
         let category = new Category(postBlock);

         category = await category.save();

         if (!category) {
            return res.status(404).send("the category cannot be created!");
         }

         res.status(200).send(category);
      } catch (error) {
         next(error);
      }
   }
);
router.put(
   "/:id",
   uploadOptions.fields([
      { name: "image", maxCount: 1 },
      { name: "icon", maxCount: 1 },
   ]),
   async (req, res, next) => {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Invalid Product ID");
         }
         let updateBlock = {};
         const file = req.files;
         const basePath = `${req.protocol}://${req.get(
            "host"
         )}/public/categories/`;

         if (req.body.name) {
            updateBlock["name"] = req.body.name;
         }
         const categoryInfo = await Category.findById(req.params.id);
         if (file.image) {
            if (categoryInfo.image) {
               const img = categoryInfo.image.split("/");
               img.splice(0, 3);
               const result = path.join(__dirname, "../", ...img);
               console.log("result", result);
               fs.unlinkSync(result);
            }
            const fileName = file.image[0].filename;
            updateBlock["image"] = `${basePath}${fileName}`;
         }
         if (file.icon) {
            if (categoryInfo.icon) {
               const img = categoryInfo.icon.split("/");
               img.splice(0, 3);
               const result = path.join(__dirname, "../", ...img);
               console.log("result", result);
               fs.unlinkSync(result);
            }
            const fileName = file.icon[0].filename;
            updateBlock["icon"] = `${basePath}${fileName}`;
         }
         const category = await Category.findByIdAndUpdate(
            req.params.id,
            updateBlock,
            { new: true }
         );
         if (!category) {
            return res.status(404).send("the category cannot be updated!");
         }

         res.status(200).send(category);
      } catch (error) {
         next(error);
      }
   }
);

router.delete("/:id", (req, res) => {
   Category.findByIdAndRemove(req.params.id)
      .then((category) => {
         if (category) {
            if (category.image) {
               const img = category.image.split("/");
               img.splice(0, 3);
               const result = path.join(__dirname, "../", ...img);
               console.log("result", result);
               fs.unlinkSync(result);
            }
            if (category.icon) {
               const img = category.icon.split("/");
               img.splice(0, 3);
               const result = path.join(__dirname, "../", ...img);
               console.log("result", result);
               fs.unlinkSync(result);
            }
            return res
               .status(200)
               .json({ success: true, message: "The category was deleted." });
         } else {
            return res
               .status(404)
               .json({ success: false, message: "The category is not found." });
         }
      })
      .catch((err) => {
         return res.status(400).json({ success: false, error: err });
      });
});

module.exports = router;
