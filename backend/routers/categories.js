const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const multer = require("multer");
const mongoose = require("mongoose");
const FILE_TYPE_MAP = {
   "image/png": "png",
   "image/jpeg": "jpeg",
   "image/jpg": "jpg",
   "image/webp": "webp",
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
      res.send(categoryList);
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

router.post("/", async (req, res) => {
   let category = new Category({
      name: req.body.name,
      title: req.body.title,
      icon: req.body.icon,
   });

   category = await category.save();

   if (!category) {
      return res.status(404).send("the category cannot be created!");
   }

   res.send(category);
});

router.put("/:id", uploadOptions.single("image"), async (req, res, next) => {
   try {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).send("Invalid Product ID");
      }
      console.log(req.body);
      let updateBlock = {};
      const file = req.file;
      let basePath;
      let fileName;
      if (req.body.name) {
         updateBlock["name"] = req.body.name;
      }
      if (file) {
         basePath = `${req.protocol}://${req.get("host")}/public/categories/`;
         fileName = req.file.filename;
         updateBlock["image"] = `${basePath}${fileName}`;
      }

      const category = await Category.findByIdAndUpdate(
         req.params.id,
         updateBlock,
         { new: true }
      );
      if (!category) {
         return res.status(404).send("the category cannot be updated!");
      }

      res.send(category);
   } catch (error) {
      next(error);
   }
});

router.delete("/:id", (req, res) => {
   Category.findByIdAndRemove(req.params.id)
      .then((category) => {
         if (category) {
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
