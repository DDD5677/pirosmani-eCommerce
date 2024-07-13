const { default: mongoose } = require("mongoose");
const fs = require("fs");
const path = require("path");
const Product = require("../models/product");
const Category = require("../models/category");
const Review = require("../models/review");
const BaseError = require("../helpers/base.error");

class ProductController {
   async getProduct(req, res, next) {
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
         if (req.query.rating) {
            filter["ratings"] = req.query.rating;
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
            if (!mongoose.isValidObjectId(req.query.category)) {
               throw BaseError.BadRequest("Invalid Category ID");
            }
            const category = await Category.findById(req.query.category);
            if (!category)
               throw BaseError.NotFound(
                  "The category with given Id is not found"
               );
            filter = { ...filter, category: req.query.category };
         }
         if (req.query.search) {
            filter = {
               ...filter,
               name: { $regex: req.query.search, $options: "i" },
            };
         }
         //--------------------------------------------
         let queryStr = JSON.stringify(filter);
         queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
         );
         filter = JSON.parse(queryStr);
         //--------------------------------------------
         totalProducts = await Product.countDocuments(filter).exec();
         if (!totalProducts) {
            return res.status(200).send({
               productList: [],
               pagination: {
                  pageSize: pageSize,
                  limit: limit,
                  page: page,
               },
            });
         }
         pageSize = Math.ceil(totalProducts / limit);
         if (page > pageSize) {
            throw BaseError.NotFound("Page is not found.");
         }

         const productList = await Product.find(filter)
            .sort(req.query.sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("category")
            .exec();
         if (!productList) {
            throw BaseError.NotFound("Products are not found.");
         }
         res.status(200).send({
            productList: productList,
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

   async getOneProduct(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Product Id");
         }
         const product = await Product.findById(req.params.id).populate(
            "category"
         );

         if (!product) {
            throw BaseError.NotFound("The product with given Id is not found");
         }

         res.status(200).send(product);
      } catch (error) {
         next(error);
      }
   }

   async createProduct(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.body.category)) {
            throw BaseError.BadRequest("Invalid Category Id");
         }
         const category = await Category.findById(req.body.category);
         if (!category)
            throw BaseError.NotFound(
               "The caategory with given id is not found"
            );
         const file = req.file;
         if (!file) throw BaseError.BadRequest("There is not image in request");

         const fileName =
            req.file.destination.slice(1) + "/" + req.file.filename;
         let product = new Product({
            name: req.body.name,
            dsc: req.body.dsc,
            richDsc: req.body.richDsc,
            img: fileName,
            images: req.body.images,
            country: req.body.country,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
         });

         product = await product.save();

         if (!product) {
            throw BaseError.BadRequest("The product is not created");
         }

         res.status(201).send(product);
      } catch (error) {
         next(error);
      }
   }

   async updateProduct(req, res, next) {
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

         if (req.body.category) {
            if (!mongoose.isValidObjectId(req.body.category)) {
               throw BaseError.BadRequest("Invalid Category Id");
            }
            const category = await Category.findById(req.body.category);
            if (!category) {
               throw BaseError.NotFound(
                  "The category with given id is not found"
               );
            } else {
               updateBlock["category"] = req.body.category;
            }
         }

         if (file) {
            const productInfo = await Product.findById(req.params.id);
            if (productInfo.img) {
               const result = path.join(process.cwd(), productInfo.img);

               if (fs.existsSync(result)) {
                  fs.unlinkSync(result);
               }
            }
            updateBlock["img"] =
               req.file.destination.slice(1) + "/" + req.file.filename;
         }

         const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateBlock,
            { new: true }
         );
         if (!product) {
            throw BaseError.BadRequest("The product is not updated");
         }

         res.status(200).send(product);
      } catch (error) {
         next(error);
      }
   }

   async deleteProduct(req, res, next) {
      try {
         const products = req.body.products;
         if (products) {
            await products.forEach(async (product) => {
               const removedProduct = await Product.findByIdAndRemove(product);
               if (removedProduct) {
                  await Review.findOneAndRemove({ product: removedProduct.id });
                  if (removedProduct.img) {
                     const result = path.join(
                        process.cwd(),
                        removedProduct.img
                     );
                     if (fs.existsSync(result)) {
                        fs.unlinkSync(result);
                     }
                  }
               } else {
                  throw BaseError.NotFound("The product is not found");
               }
            });
            return res.status(200).json({
               success: true,
               message: "The Product was deleted.",
            });
         } else {
            throw BaseError.BadRequest("There is not Product in request.");
         }
      } catch (error) {
         next(error);
      }
   }

   async getProductCount(req, res, next) {
      try {
         const productCount = await Product.countDocuments();

         if (!productCount) {
            throw BaseError.BadRequest(
               "The count of products is not calculated or count is 0"
            );
         }
         res.status(200).send({
            productCount: productCount,
         });
      } catch (error) {
         next(error);
      }
   }

   async getFeaturedProductCount(req, res, next) {
      try {
         const count = req.params.count ? req.params.count : 0;
         const products = await Product.find({ isFeatured: true }).limit(count);
         if (!products) {
            throw BaseError.NotFound("The products are not found");
         }
         res.status(200).send(products);
      } catch (error) {
         next(error);
      }
   }

   async updateProductGallery(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Product ID");
         }
         const basePath = `${req.protocol}://${req.get(
            "host"
         )}/public/uploads/`;
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
            throw BaseError.BadRequest("The product is not updated");
         }
         res.status(200).send(product);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new ProductController();
