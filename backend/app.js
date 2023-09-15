const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

const api = process.env.API_URL;
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");
const reviewsRouter = require("./routers/reviews");
const reservationRouter = require("./routers/reservations");
const { authJwt } = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

//*TODO:middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public", express.static(__dirname + "/public"));

//*TODO:routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/reviews`, reviewsRouter);
app.use(`${api}/reservations`, reservationRouter);

app.use(errorHandler);
mongoose
   .connect(process.env.CONNECTING_STRING)
   .then(() => {
      console.log("Database connection is ready");
   })
   .catch((e) => {
      console.log(e);
   });

app.listen(3000, () => {
   console.log("server is running on http://localhost:3000");
});
