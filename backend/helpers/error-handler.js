function errorHandler(err, req, res, next) {
   console.log(err);
   if (err.name === "UnauthorizedError") {
      return res.status(500).json("The user is not authorized, please sign in");
   }
   if (err.name === "ValidationError") {
      return res.status(401).json({ message: err });
   }

   return res.status(500).json({ message: "errorHandler", error: err });
}

module.exports = errorHandler;
