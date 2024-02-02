const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      cb(uploadError, "public/avatars");
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
         return res.status(404).json({
            success: false,
            message: "Page is not found!",
         });
      }
      const usersList = await User.find(filter)
         .sort(req.query.sort)
         .skip((page - 1) * limit)
         .limit(limit)
         .exec();
      if (!usersList) {
         res.status(404).json({
            success: false,
            message: "Users is not found!",
         });
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
});

router.get("/:id", async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id).select("-password");

      if (!user) {
         res.status(500).json({
            message: "The user with the given ID was not found.",
         });
      }

      res.status(200).send(user);
   } catch (error) {
      next(error);
   }
});

router.post("/", uploadOptions.single("avatar"), async (req, res, next) => {
   try {
      //verify file exist or not
      const file = req.file;
      let user;
      if (file) {
         const basePath = `${req.protocol}://${req.get(
            "host"
         )}/public/avatars/`;
         const fileName = req.file.filename;
         //-------------------------------------------

         user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
            phone: req.body.phone,
            extraPhone: req.body.extraPhone,
            image: `${basePath}${fileName}`,
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
         return res.status(404).send("the user cannot be created!");
      }

      res.send(user);
   } catch (error) {
      next(error);
   }
});

router.get("/get/user", async (req, res, next) => {
   try {
      let token;
      let currentUser;
      const secret = process.env.secret;
      console.log("token", req.headers["authorization"]);
      if (
         req.headers["authorization"] &&
         req.headers["authorization"].split(" ")[0] === "Bearer"
      ) {
         token = req.headers["authorization"].split(" ")[1];
      } else {
         console.log("token is not found");
      }
      jwt.verify(token, secret, function (err, decoded) {
         if (err) {
            console.log("Error: ", err);
         }
         currentUser = decoded;
      });
      const user = await User.findById(currentUser.userId).select("-password");

      if (!user) {
         res.status(500).json({
            message: "The user with the given ID was not found.",
         });
      }

      res.status(200).send({ user: user });
   } catch (error) {
      next(error);
   }
});

router.post("/login", async (req, res, next) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      const secret = process.env.secret;
      if (!user) {
         return res.status(400).send("the user not found");
      }

      if (user && bcrypt.compareSync(req.body.password, user.password)) {
         const token = jwt.sign(
            {
               userId: user.id,
               isAdmin: user.isAdmin,
            },
            secret,
            {
               expiresIn: "7d",
            }
         );
         res.status(200).send({ user: user, token: token });
      } else {
         res.status(400).send("password is wrong");
      }
   } catch (error) {
      next(error);
   }
});
router.post("/admin/login", async (req, res, next) => {
   try {
      if (!req.body.email || !req.body.password) {
         return res.status(400).json({ auth: "Please fill in all inputs" });
      }
      const user = await User.findOne({ email: req.body.email });
      const secret = process.env.secret;

      if (!user || !user.isAdmin) {
         return res.status(400).json({ auth: "the admin user not found" });
      }

      if (user && bcrypt.compareSync(req.body.password, user.password)) {
         const token = jwt.sign(
            {
               userId: user.id,
               isAdmin: user.isAdmin,
            },
            secret,
            {
               expiresIn: "1d",
            }
         );
         res.status(200).send({ user: user, token: token });
      } else {
         res.status(400).send({ auth: "password is wrong" });
      }
   } catch (error) {
      next(error);
   }
});

router.post("/register", async (req, res, next) => {
   try {
      let user = new User({
         name: req.body.name,
         surname: req.body.surname,
         email: req.body.email,
         password: req.body.password,
         isAdmin: req.body.isAdmin,
         phone: req.body.phone,
         extraPhone: req.body.extraPhone,
         image: req.body.image,
      });
      console.log("1", user);
      user = await user.save();
      console.log(user);
      if (!user) {
         return res.status(404).send("the user cannot be created!");
      }

      res.status(200).send(user);
   } catch (error) {
      next(error);
   }
});

router.put("/:id", uploadOptions.single("avatar"), async (req, res, next) => {
   try {
      const userExist = await User.findById(req.params.id);
      if (!userExist) {
         return res
            .status(404)
            .send("the user cannot be updated because user id is wrong!");
      }
      let newPassword;
      let basePath;
      let fileName;
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
            const img = userInfo.image.split("/");
            img.splice(0, 3);
            const result = path.join(__dirname, "../", ...img);
            console.log("result", result);
            if (fs.existsSync(result)) {
               fs.unlinkSync(result);
            }
         }
         basePath = `${req.protocol}://${req.get("host")}/public/avatars/`;
         fileName = req.file.filename;
         updateBlock["image"] = `${basePath}${fileName}`;
      }
      if (req.body.isAdmin) {
         updateBlock["isAdmin"] = req.body.isAdmin;
      }

      if (req.body.password) {
         if (bcrypt.compareSync(req.body.password, userExist.password)) {
            if (req.body.newPassword.length < 6) {
               return res.status(400).json({
                  password:
                     "the password length must be at least 6 characters!",
               });
            } else {
               newPassword = req.body.newPassword;
            }
         } else {
            return res.status(400).json({ error: "the password is wrong!" });
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

      if (!user) return res.status(400).send("the user cannot be updated!");

      res.status(200).send({ user });
   } catch (error) {
      next(error);
   }
});

router.delete("/", async (req, res) => {
   try {
      const users = req.body.users;
      if (users) {
         await users.forEach(async (user) => {
            const removedUser = await User.findByIdAndRemove(user);
            console.log("removedUser", removedUser);
            if (removedUser) {
               if (removedUser.image) {
                  const img = removedUser.image.split("/");
                  img.splice(0, 3);
                  const result = path.join(__dirname, "../", ...img);
                  console.log("result", result);
                  if (fs.existsSync(result)) {
                     fs.unlinkSync(result);
                  }
               }
            } else {
               return res.status(404).json({
                  success: false,
                  message: "The User is not found.",
               });
            }
         });
         return res.status(200).json({
            success: true,
            message: "The User was deleted.",
         });
      } else {
         return res.status(200).json({
            success: true,
            message: "There is not User in request.",
         });
      }
   } catch (error) {
      next(error);
   }
});

router.get(`/get/count`, async (req, res) => {
   const userCount = await User.countDocuments();

   if (!userCount) {
      res.status(500).json({
         success: false,
      });
   }
   res.send({
      userCount: userCount,
   });
});

module.exports = router;
