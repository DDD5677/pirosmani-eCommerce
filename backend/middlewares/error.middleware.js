const BaseError = require("../helpers/base.error");

module.exports = function (err, req, res, next) {
   let errors = {};
   if (err instanceof BaseError) {
      return res.status(err.status).json({
         message: err.message,
         errors: err.errors,
      });
   }
   //mongoose errors
   if (err.code === 11000) {
      errors.email = "That email is already registered";
      return res
         .status(400)
         .json({ message: "Validation error", errors: errors });
   }
   if (err.name === "ValidationError") {
      Object.values(err.errors).forEach(({ properties }) => {
         errors[properties.path] = properties.message;
      });
      return res
         .status(400)
         .json({ message: "Validation error", errors: errors });
   }
   return res.status(500).json({
      message: "Server error",
   });
};
