const BaseError = require("../helpers/base.error");
const Reservation = require("../models/reservation");

class ReserveController {
   async getReserve(req, res, next) {
      try {
         let filter = {};
         let page = 1;
         let limit = 5;
         let totalReservations = 0;
         let pageSize = 1;
         if (req.query.page) {
            page = +req.query.page;
         }
         if (req.query.limit) {
            limit = +req.query.limit;
         }
         //Building filter object
         if (req.query.user) {
            filter["user"] = req.query.user;
         }
         if (req.query.date) {
            filter["date"] = req.query.date;
         }
         if (req.query.createdAt) {
            filter["createdAt"] = { gte: req.query.createdAt };
         }
         if (req.query.status) {
            filter["status"] = req.query.status;
         }
         // if (req.query.totalPrice) {
         //    if (req.query.totalPrice.lte) {
         //       filter = {
         //          ...filter,
         //          totalPrice: {
         //             ...filter.totalPrice,
         //             lte: req.query.totalPrice.lte,
         //          },
         //       };
         //    }
         //    if (req.query.totalPrice.gte) {
         //       filter = {
         //          ...filter,
         //          totalPrice: {
         //             ...filter.totalPrice,
         //             gte: req.query.totalPrice.gte,
         //          },
         //       };
         //    }
         // }
         if (req.query.search) {
            filter = {
               ...filter,
               name: { $regex: req.query.search, $options: "i" },
            };
         }
         //--------------------------------------------------------
         let queryStr = JSON.stringify(filter);
         queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
         );
         filter = JSON.parse(queryStr);

         console.log(filter);
         totalReservations = await Reservation.countDocuments(filter).exec();
         if (!totalReservations) {
            return res.status(200).json({
               reservationList: [],
               pagination: {
                  pageSize: 1,
                  limit: limit,
                  page: page,
               },
            });
         }
         pageSize = Math.ceil(totalReservations / limit);
         if (page > pageSize) {
            throw BaseError.NotFound("Page is not found");
         }
         const reservationList = await Reservation.find(filter)
            .sort(req.query.sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("user");

         if (!reservationList) {
            throw BaseError.NotFound("The reservations are not found");
         }
         res.status(200).send({
            reservationList: reservationList,
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

   async getOneReserve(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Reservation ID");
         }
         const reservation = await Reservation.findById(req.params.id).populate(
            {
               path: "user",
               select: ["name", "phone"],
            }
         );

         if (!reservation) {
            throw BaseError.NotFound(
               "The reservation with the given ID was not found."
            );
         }

         res.status(200).send(reservation);
      } catch (error) {
         next(error);
      }
   }

   async createReserve(req, res, next) {
      try {
         let reservation = new Reservation({
            user: req.body.user,
            name: req.body.name,
            phone: req.body.phone,
            numOfPeople: req.body.numOfPeople,
            time: req.body.time,
            date: req.body.date,
         });

         reservation = await reservation.save();

         if (!reservation) {
            throw BaseError.BadRequest("The reservation is not created");
         }

         res.status(200).send(reservation);
      } catch (error) {
         next(error);
      }
   }

   async updateReserve(req, res, next) {
      try {
         let updateBlock = {};
         let filter = {};
         //create filter
         if (req.body.id) {
            if (!mongoose.isValidObjectId(req.body.id)) {
               throw BaseError.BadRequest("Invalid Reservation ID");
            }
            filter["_id"] = req.body.id;
         }
         if (req.body.product) {
            if (!mongoose.isValidObjectId(req.body.product)) {
               throw BaseError.BadRequest("Invalid Product ID");
            }
            filter["product"] = req.body.product;
         }
         if (req.body.user) {
            if (!mongoose.isValidObjectId(req.body.user)) {
               throw BaseError.BadRequest("Invalid User ID");
            }
            filter["user"] = req.body.user;
         }
         //create updateBlock
         if (req.body.numOfPeople) {
            updateBlock["numOfPeople"] = req.body.numOfPeople;
         }
         if (req.body.status) {
            updateBlock["status"] = req.body.status;
         }
         if (req.body.time) {
            updateBlock["time"] = req.body.time;
         }
         if (req.body.date) {
            updateBlock["date"] = req.body.date;
         }
         const reservation = await Reservation.findOneAndUpdate(
            filter,
            updateBlock,
            {
               new: true,
               runValidators: true,
            }
         );
         if (!reservation) {
            throw BaseError.NotFound("The reservation is not updated");
         }

         res.status(200).send(reservation);
      } catch (error) {
         next(error);
      }
   }
   //refactor code and next() function
   deleteReserve(req, res, next) {
      Reservation.deleteMany({ _id: { $in: req.body.reservations } })
         .then((reservation) => {
            if (reservation) {
               return res.status(200).json({
                  success: true,
                  message: "The reservation was deleted.",
               });
            } else {
               throw BaseError.BadRequest("The reservations are not deleted");
            }
         })
         .catch((error) => {
            next(error);
         });
   }
}

module.exports = new ReserveController();
