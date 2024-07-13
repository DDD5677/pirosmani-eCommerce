const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const generateTokens = require("../helpers/tokens");
const emailService = require("../helpers/mail");
const BaseError = require("../helpers/base.error");
class AuthController {
   async login(req, res, next) {
      try {
         const user = await User.findOne({ email: req.body.email });
         if (!user) {
            throw BaseError.NotFound("The user is not found");
         }

         if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateTokens({
               id: user.id,
               isAdmin: user.isAdmin,
            });
            res.cookie("refreshToken", token.refreshToken, {
               httpOnly: true,
               maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
               secure: true,
               //sameSite: "none",
            });
            res.status(200).send({ user: user, token: token.accessToken });
         } else {
            throw BaseError.BadRequest("Password is wrong");
         }
      } catch (error) {
         next(error);
      }
   }

   async adminLogin(req, res, next) {
      try {
         if (!req.body.email || !req.body.password) {
            return res.status(400).json({ auth: "Please fill in all inputs" });
         }
         const user = await User.findOne({ email: req.body.email });

         if (!user || !user.isAdmin) {
            return res.status(400).json({ auth: "the admin user not found" });
         }

         if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateTokens({
               id: user.id,
               isAdmin: user.isAdmin,
            });
            res.cookie("refreshToken", token.refreshToken, {
               httpOnly: true,
               maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
               secure: true,
            });
            res.status(200).send({ user: user, token: token.accessToken });
         } else {
            res.status(400).send({ auth: "password is wrong" });
         }
      } catch (error) {
         next(error);
      }
   }

   async register(req, res, next) {
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
         user = await user.save();
         await emailService.sendMail(
            req.body.email,
            `${process.env.BASE_URL}${process.env.API_URL}/auth/activation/${user._id}`
         );
         if (!user) {
            throw BaseError.BadRequest("The user is not created");
         }

         res.status(200).send(user);
      } catch (error) {
         next(error);
      }
   }
   async activate(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid user ID");
         }
         const user = await User.findById(req.params.id);
         if (!user) {
            throw BaseError.NotFound("The user is not found");
         }
         user.isActivated = true;
         await user.save();
         res.redirect(process.env.CLIENT_URL);
      } catch (error) {
         next(error);
      }
   }
   async refresh(req, res, next) {
      try {
         const refreshToken = req.cookies["refreshToken"];
         let payload;
         if (!refreshToken) {
            throw BaseError.BadRequest("Refresh token is undefined");
         }
         jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET,
            function (err, decoded) {
               if (err) {
                  throw BaseError.BadRequest("Refresh token is not valid", err);
               }
               payload = decoded;
            }
         );
         if (!payload) {
            throw BaseError.BadRequest("Refresh token is not valid");
         }

         const token = generateTokens(payload);
         res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
            secure: true,
         });
         res.status(200).send({ token: token.accessToken });
      } catch (error) {
         next(error);
      }
   }
   async logout(req, res, next) {
      try {
         res.cookie("refreshToken", "", { maxAge: 0 });
         res.status(200).send({
            success: true,
            message: "User successfully logged out",
         });
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new AuthController();
