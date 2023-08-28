const { expressjwt: jwt } = require("express-jwt");
const secret = process.env.secret;
const JWT = require("jsonwebtoken");

function authJwt() {
   const api = process.env.API_URL;
   return jwt({
      secret,
      algorithms: ["HS256"],
      //isRevoked: isRevoked,
   }).unless({
      path: [
         { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
         { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
         `${api}/users/login`,
         `${api}/users/register`,
      ],
   });
}

// async function isRevoked(req, token) {
//    if (token.payload.isAdmin == false) {
//       return true;
//    }
//    return false;
// }

const authAdmin = (req, res, next) => {
   if (
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[0] === "Bearer"
   ) {
      const token = req.headers["authorization"].split(" ")[1];

      JWT.verify(token, secret, function (err, decoded) {
         if (err) {
            return res
               .status(401)
               .json({ message: "invalid token", error: err });
         } else if (decoded.isAdmin === true) {
            next();
         } else {
            return res.status(401).json({ message: "not allowed" });
         }
      });
   } else {
      console.log("token is not found");
   }
};
module.exports = { authJwt, authAdmin };
