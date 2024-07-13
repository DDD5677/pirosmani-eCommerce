const fs = require("fs");
const path = require("path");
const Category = require("../models/category");
const { default: mongoose } = require("mongoose");
const BaseError = require("../helpers/base.error");

class CategoryController {
   async getCategory(req, res, next) {
      try {
         const categoryList = await Category.find({});

         if (!categoryList) {
            throw BaseError.NotFound("Categories is not found");
         }
         res.status(200).send(categoryList);
      } catch (error) {
         next(error);
      }
   }

   async getOneCategory(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Category ID");
         }
         const category = await Category.findById(req.params.id);

         if (!category) {
            throw BaseError.NotFound(
               "The category with the given ID was not found."
            );
         }

         res.status(200).send(category);
      } catch (error) {
         next(error);
      }
   }

   async createCategory(req, res, next) {
      try {
         let postBlock = {
            name: req.body.name,
         };
         const file = req.files;
         if (file.category_image) {
            postBlock["image"] =
               file.category_image[0].destination.slice(1) +
               "/" +
               file.category_image[0].filename;
         }
         if (file.category_icon) {
            postBlock["icon"] =
               file.category_icon[0].destination.slice(1) +
               "/" +
               file.category_icon[0].filename;
         }
         let category = new Category(postBlock);

         category = await category.save();

         if (!category) {
            throw BaseError.BadRequest("The category is not created");
         }

         res.status(200).send(category);
      } catch (error) {
         next(error);
      }
   }

   async updateCategory(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Category ID");
         }
         let updateBlock = {};
         const file = req.files;

         if (req.body.name) {
            updateBlock["name"] = req.body.name;
         }
         const categoryInfo = await Category.findById(req.params.id);
         if (file.category_image) {
            if (categoryInfo.image) {
               const result = path.join(process.cwd(), categoryInfo.image);
               if (fs.existsSync(result)) {
                  fs.unlinkSync(result);
               }
            }
            updateBlock["image"] =
               file.category_image[0].destination.slice(1) +
               "/" +
               file.category_image[0].filename;
         }
         if (file.category_icon) {
            if (categoryInfo.icon) {
               const result = path.join(process.cwd(), categoryInfo.icon);
               if (fs.existsSync(result)) {
                  fs.unlinkSync(result);
               }
            }
            updateBlock["icon"] =
               file.category_icon[0].destination.slice(1) +
               "/" +
               file.category_icon[0].filename;
         }
         const category = await Category.findByIdAndUpdate(
            req.params.id,
            updateBlock,
            { new: true }
         );
         if (!category) {
            throw BaseError.BadRequest("The category is not updated");
         }

         res.status(200).send(category);
      } catch (error) {
         next(error);
      }
   }
   //refactor code and add next()
   deleteCategory(req, res, next) {
      if (!mongoose.isValidObjectId(req.params.id)) {
         throw BaseError.BadRequest("Invalid Category ID");
      }
      Category.findByIdAndRemove(req.params.id)
         .then((category) => {
            if (category) {
               if (category.image) {
                  const result = path.join(process.cwd(), category.image);
                  if (fs.existsSync(result)) {
                     fs.unlinkSync(result);
                  }
               }
               if (category.icon) {
                  const result = path.join(process.cwd(), category.icon);
                  if (fs.existsSync(result)) {
                     fs.unlinkSync(result);
                  }
               }
               return res.status(200).json({
                  success: true,
                  message: "The category was deleted.",
               });
            } else {
               throw BaseError.BadRequest("The category is not deleted");
            }
         })
         .catch((error) => {
            next(error);
         });
   }
}

module.exports = new CategoryController();
