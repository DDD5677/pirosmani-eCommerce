const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const { authAdmin } = require("../helpers/jwt");
const multer = require("multer");

const FILE_TYPE_MAP = {
   "image/png": "png",
   "image/jpeg": "jpeg",
   "image/jpg": "jpg",
};

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error("invalid image type");
      if (isValid) {
         uploadError = null;
      }
      cb(uploadError, "public/uploads");
   },
   filename: function (req, file, cb) {
      const fileName = file.originalname.split(" ").join("-");
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`);
   },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
   try {
      let filter = {};
      let page = 1;
      let limit = 5;
      let totalProducts = 0;
      let pageSize = 1;

      if (req.query.page) {
         page = req.query.page;
      }
      if (req.query.limit) {
         limit = req.query.limit;
      }
      //Building filter object
      if (req.query.price) {
         if (req.query.price.lte) {
            filter = {
               ...filter,
               price: { ...filter.price, lte: req.query.price.lte },
            };
         }
         if (req.query.price.gte) {
            filter = {
               ...filter,
               price: { ...filter.price, gte: req.query.price.gte },
            };
         }
      }
      if (req.query.isFeatured) {
         filter = { ...filter, isFeatured: req.query.isFeatured };
      }
      if (req.query.countInStock) {
         if (req.query.countInStock.gte) {
            filter = {
               ...filter,
               countInStock: { gte: req.query.countInStock.gte },
            };
         }
      }
      if (req.query.category) {
         const category = await Category.findById(req.query.category);
         if (!category)
            return res.status(400).json({
               success: false,
               message: "Invalid Category",
            });
         filter = { ...filter, category: req.query.category };
      }
      //--------------------------------------------
      let queryStr = JSON.stringify(filter);
      queryStr = queryStr.replace(
         /\b(gte|gt|lte|lt)\b/g,
         (match) => `$${match}`
      );
      filter = JSON.parse(queryStr);

      console.log(filter);

      totalProducts = await Product.countDocuments(filter).exec();
      pageSize = Math.ceil(totalProducts / limit);
      if (page > pageSize) {
         return res.status(404).json({
            success: false,
            message: "Page is not found!",
         });
      }
      console.log("sort", req.query.sort);
      const productList = await Product.find(filter)
         .sort(req.query.sort)
         .skip((page - 1) * limit)
         .limit(limit)
         .populate("category")
         .exec();
      if (!productList) {
         res.status(404).json({
            success: false,
            message: "Products is not found!",
         });
      }
      res.send({
         productList: productList,
         pagination: {
            pageSize: pageSize,
            limit: limit,
            page: page,
         },
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
});

router.get(`/:id`, async (req, res, next) => {
   try {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).json({
            success: false,
            message: "Invalid Id",
         });
      }
      const product = await Product.findById(req.params.id).populate(
         "category"
      );

      if (!product) {
         res.status(500).json({
            success: false,
         });
      }
      res.status(200).send(product);
   } catch (error) {
      next(error);
   }
});

router.post(`/`, uploadOptions.single("image"), async (req, res, next) => {
   try {
      const category = await Category.findById(req.body.category);
      if (!category) return res.status(400).send("Invalid Category");
      const file = req.file;
      if (!file) return res.status(400).send("no image in the request");

      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      const fileName = req.file.filename;

      let product = new Product({
         name: req.body.name,
         dsc: req.body.dsc,
         richDsc: req.body.richDsc,
         img: `${basePath}${fileName}`,
         images: req.body.images,
         country: req.body.country,
         price: req.body.price,
         category: req.body.category,
         countInStock: req.body.countInStock,
         isFeatured: req.body.isFeatured,
      });

      product = await product.save();

      if (!product) {
         return res.status(500).send("The product cannot be created.");
      }

      res.send(product);
   } catch (error) {
      next(error);
   }
});

router.put("/:id", uploadOptions.single("image"), async (req, res, error) => {
   try {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).send("Invalid Product ID");
      }

      let updateBlock = {
         name: req.body.name,
         dsc: req.body.dsc,
         richDsc: req.body.richDsc,
         country: req.body.country,
         price: req.body.price,
         countInStock: req.body.countInStock,
         isFeatured: req.body.isFeatured,
      };
      const file = req.file;
      let basePath;
      let fileName;

      if (req.body.category) {
         const category = await Category.findById(req.body.category);
         if (!category) {
            return res.status(400).send("Invalid Category");
         } else {
            updateBlock["category"] = req.body.category;
         }
      }

      if (file) {
         basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
         fileName = req.file.filename;
         updateBlock["img"] = `${basePath}${fileName}`;
      }

      const product = await Product.findByIdAndUpdate(
         req.params.id,
         updateBlock,
         { new: true }
      );
      if (!product) {
         return res.status(500).send("the product cannot be updated!");
      }

      res.status(200).send(product);
   } catch (error) {
      next(error);
   }
});

router.delete("/", (req, res) => {
   Product.deleteMany({ _id: { $in: req.body.products } })
      .then((product) => {
         if (product) {
            return res
               .status(200)
               .json({ success: true, message: "The product was deleted." });
         } else {
            return res
               .status(404)
               .json({ success: false, message: "The product is not found." });
         }
      })
      .catch((err) => {
         return res.status(400).json({ success: false, error: err });
      });
});

router.get(`/get/count`, async (req, res) => {
   const productCount = await Product.countDocuments();

   if (!productCount) {
      res.status(500).json({
         success: false,
      });
   }
   res.send({
      productCount: productCount,
   });
});

router.get(`/get/featured/:count`, async (req, res) => {
   try {
      const count = req.params.count ? req.params.count : 0;
      const products = await Product.find({ isFeatured: true }).limit(count);
      if (!products) {
         res.status(500).json({
            success: false,
         });
      }
      res.send(products);
   } catch (err) {
      return res.status(400).json({ success: false, error: err });
   }
});

router.put(
   "/gallery-images/:id",
   uploadOptions.array("images", 10),
   async (req, res) => {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).send("Invalid Product ID");
      }
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      const files = req.files;
      let imagesPaths = [];
      if (files) {
         files.map((file) => {
            imagesPaths.push(`${basePath}${file.filename}`);
         });
      }
      const product = await Product.findByIdAndUpdate(
         req.params.id,
         {
            images: imagesPaths,
         },
         { new: true }
      );
      if (!product) {
         return res.status(500).send("the product cannot be updated!");
      }
      res.send(product);
   }
);
module.exports = router;
