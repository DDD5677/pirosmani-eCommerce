const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

const api = process.env.API_URL;
const PORT = process.env.PORT || 3000;

const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const usersRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const ordersRouter = require("./routers/orders");
const reviewsRouter = require("./routers/reviews");
const reservationRouter = require("./routers/reservations");
const bannerRouter = require("./routers/banners");
const infoRouter = require("./routers/informations");
const { authJwt } = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");

app.use(cors());
app.options("*", cors());
app.enable("trust proxy");
mongoose.set("toJSON", { getters: true });
//*TODO:middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public", express.static(__dirname + "/public"));

//*TODO:routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/auth`, authRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/reviews`, reviewsRouter);
app.use(`${api}/reservations`, reservationRouter);
app.use(`${api}/banners`, bannerRouter);
app.use(`${api}/informations`, infoRouter);

//app.use(errorHandler);
app.use(errorMiddleware);
mongoose
   .connect(process.env.CONNECTING_STRING)
   .then(() => {
      console.log("Database connection is ready");
   })
   .catch((e) => {
      console.log(e);
   });

app.listen(PORT, () => {
   console.log(`server is running on http://localhost:${PORT}`);
});

/* changed auth routers so that have to change auth in admin and frontend
	have to take out multer logic in separate file done
	- products done
	- banners done
	- categories done
	- users done
	add refresh and logout route done
	add isActivate to email with SMTP done (but need some refactoring)
	BaseError create done
	Refactoring routes
	- auth done
	- banners done
	- categories done
	- informations done
	- orders done
	- products done
	- reservations done
	- reviews done
	- users done
	to check updateReservations (why there is filter)
	reorganize middlewares and helpers folder
	have to think how to implement product gallery image
	decrement rating product when deleted review
*/
