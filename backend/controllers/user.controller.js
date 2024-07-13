const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const BaseError = require("../helpers/base.error");
class UserController {
   async getUser(req, res, next) {
      try {
         let filter = {};
         let page = 1;
         let limit = 10;
         let totalUsers = 0;
         let pageSize = 1;

         if (req.query.page) {
            page = req.query.page;
         }
         if (req.query.limit) {
            limit = req.query.limit;
         }
         if (req.query.search) {
            filter = {
               $or: [
                  { name: { $regex: req.query.search, $options: "i" } },
                  { email: { $regex: req.query.search, $options: "i" } },
               ],
            };
         }
         totalUsers = await User.countDocuments(filter).exec();
         if (!totalUsers) {
            return res.status(200).send({
               usersList: [],
               pagination: {
                  pageSize: pageSize,
                  limit: limit,
                  page: page,
               },
            });
         }
         pageSize = Math.ceil(totalUsers / limit);
         if (page > pageSize) {
            throw BaseError.NotFound("Page is not found");
         }
         const usersList = await User.find(filter)
            .sort(req.query.sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
         if (!usersList) {
            throw BaseError.NotFound("The users are not found");
         }
         res.send({
            usersList: usersList,
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
   async getOneUser(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid User ID");
         }
         const user = await User.findById(req.params.id).select("-password");

         if (!user) {
            throw BaseError.NotFound(
               "The user with the given ID was not found."
            );
         }

         res.status(200).send(user);
      } catch (error) {
         next(error);
      }
   }
   async createUser(req, res, next) {
      try {
         //verify file exist or not
         const file = req.file;
         let user;
         if (file) {
            user = new User({
               name: req.body.name,
               surname: req.body.surname,
               email: req.body.email,
               password: req.body.password,
               isAdmin: req.body.isAdmin,
               phone: req.body.phone,
               extraPhone: req.body.extraPhone,
               image: file.destination.slice(1) + "/" + file.filename,
            });
         } else {
            user = new User({
               name: req.body.name,
               surname: req.body.surname,
               email: req.body.email,
               password: req.body.password,
               isAdmin: req.body.isAdmin,
               phone: req.body.phone,
               extraPhone: req.body.extraPhone,
            });
         }

         user = await user.save();

         if (!user) {
            throw BaseError.BadRequest("The user is not created");
         }

         res.status(201).send(user);
      } catch (error) {
         next(error);
      }
   }
   async updateUser(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid User ID");
         }
         const userExist = await User.findById(req.params.id);
         if (!userExist) {
            throw BaseError.NotFound("The user with given Id is not found");
         }
         let newPassword;
         let updateBlock = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            extraPhone: req.body.extraPhone,
         };
         const file = req.file;

         if (file) {
            const userInfo = await User.findById(req.params.id);
            if (userInfo.image) {
               const result = path.join(process.cwd(), userInfo.image);
               if (fs.existsSync(result)) {
                  fs.unlinkSync(result);
               }
            }
            updateBlock["image"] =
               file.destination.slice(1) + "/" + file.filename;
         }
         if (req.body.isAdmin) {
            updateBlock["isAdmin"] = req.body.isAdmin;
         }

         if (req.body.password) {
            if (bcrypt.compareSync(req.body.password, userExist.password)) {
               if (req.body.newPassword.length < 6) {
                  throw BaseError.BadRequest("Validation Error", {
                     password:
                        "The password length must be at least 6 characters.",
                  });
               } else {
                  newPassword = req.body.newPassword;
               }
            } else {
               throw BaseError.BadRequest("The password is wrong");
            }
            updateBlock["password"] = newPassword;
         }

         const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            updateBlock,
            {
               new: true,
               runValidators: true,
            }
         ).select("-password");

         if (!user) throw BaseError.BadRequest("The user is not updated");

         res.status(200).send({ user });
      } catch (error) {
         next(error);
      }
   }
   async deleteUser(req, res, next) {
      try {
         const users = req.body.users;
         if (users) {
            await users.forEach(async (user) => {
               const removedUser = await User.findByIdAndRemove(user);
               if (removedUser) {
                  if (removedUser.image) {
                     const result = path.join(process.cwd(), removedUser.image);
                     if (fs.existsSync(result)) {
                        fs.unlinkSync(result);
                     }
                  }
               } else {
                  throw BaseError.NotFound("The user is not found");
               }
            });
            return res.status(200).json({
               success: true,
               message: "The User was deleted.",
            });
         } else {
            throw BaseError.BadRequest("There is not users in request");
         }
      } catch (error) {
         next(error);
      }
   }
   async getUserCount(req, res, next) {
      try {
         const userCount = await User.countDocuments();
         if (!userCount) {
            throw BaseError.BadRequest(
               "The count of users is not calculated or count is 0"
            );
         }
         res.status(200).send({
            userCount: userCount,
         });
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new UserController();
