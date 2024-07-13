const mongoose = require("mongoose");
const Order = require("../models/order");
const OrderItem = require("../models/order-items");
const User = require("../models/user");
const BaseError = require("../helpers/base.error");

class OrderController {
   async getOrder(req, res, next) {
      try {
         let filter = {};
         let page = 1;
         let limit = 5;
         let totalOrders = 0;
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
         if (req.query.status) {
            filter["status"] = req.query.status;
         }
         if (req.query.totalPrice) {
            if (req.query.totalPrice.lte) {
               filter = {
                  ...filter,
                  totalPrice: {
                     ...filter.totalPrice,
                     lte: req.query.totalPrice.lte,
                  },
               };
            }
            if (req.query.totalPrice.gte) {
               filter = {
                  ...filter,
                  totalPrice: {
                     ...filter.totalPrice,
                     gte: req.query.totalPrice.gte,
                  },
               };
            }
         }
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

         totalOrders = await Order.countDocuments(filter).exec();
         if (!totalOrders) {
            return res.status(200).json({
               orderList: [],
               pagination: {
                  pageSize: 1,
                  limit: limit,
                  page: page,
               },
            });
         }
         pageSize = Math.ceil(totalOrders / limit);
         if (page > pageSize) {
            return res.status(404).json({
               success: false,
               message: "Page is not found!",
            });
         }
         const orderList = await Order.find(filter)
            .sort(req.query.sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("user");
         // .populate({
         //    path: "orderItems",
         //    populate: { path: "product", populate: "category" },
         // });

         if (!orderList) {
            throw BaseError.NotFound("Orders are not found");
         }
         res.status(200).send({
            orderList: orderList,
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

   async getOneOrder(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Order ID");
         }
         const order = await Order.findById(req.params.id)
            .populate("user")
            .populate({
               path: "orderItems",
               populate: "product",
            });
         if (!order) {
            throw BaseError.NotFound("The order with given Id is not found");
         }
         res.status(200).send(order);
      } catch (error) {
         next(error);
      }
   }

   async getSaledCount(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Order item ID");
         }
         const orderItemsList = await OrderItem.find({
            product: req.params.id,
         });

         if (!orderItemsList) {
            throw BaseError.NotFound(
               "The order items with given product id are not found"
            );
         }
         let saledCount = 0;
         orderItemsList.forEach((item) => {
            saledCount += item.quantity;
         });
         res.status(200).send({ saledCount });
      } catch (error) {
         next(error);
      }
   }

   async createOrder(req, res, next) {
      try {
         if (req.body.orderItems.length === 0) {
            throw BaseError.BadRequest("The orderItems field is empty");
         }
         const orderItemsIds = await Promise.all(
            req.body.orderItems.map(async (orderItem) => {
               console.log(orderItem);
               let newOrderItem = new OrderItem({
                  quantity: orderItem.quantity,
                  product: orderItem.product,
               });
               newOrderItem = await newOrderItem.save();
               return newOrderItem._id;
            })
         );

         const totalPrices = await Promise.all(
            orderItemsIds.map(async (orderItemId) => {
               const orderItem = await OrderItem.findById(orderItemId).populate(
                  "product",
                  "price"
               );
               const totalPrice = orderItem.product.price * orderItem.quantity;
               return totalPrice;
            })
         );

         const totalPrice = +totalPrices.reduce((a, b) => a + b, 0).toFixed(2);

         const user = await User.findByIdAndUpdate(req.body.user, {
            $inc: { totalSpent: totalPrice },
         });
         if (!user) {
            throw BaseError.BadRequest("The user's total price is not updated");
         }

         let order = new Order({
            orderItems: orderItemsIds,
            name: req.body.name,
            shippingAdress1: req.body.shippingAdress1,
            shippingAdress2: req.body.shippingAdress2,
            city: req.body.city,
            typeOrder: req.body.typeOrder,
            comment: req.body.comment,
            datePickup: req.body.datePickup,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user,
         });

         order = await order.save();

         if (!order) {
            throw BaseError.BadRequest("The order is not created");
         }

         res.status(201).send(order);
      } catch (error) {
         next(error);
      }
   }

   async updateOrder(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.id)) {
            throw BaseError.BadRequest("Invalid Order ID");
         }
         const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
               status: req.body.status,
            },
            { new: true }
         )
            .populate("user")
            .populate({
               path: "orderItems",
               populate: "product",
            });
         if (!order) {
            throw BaseError.BadRequest("The order is not created");
         }

         res.status(200).send(order);
      } catch (error) {
         next(error);
      }
   }

   async deleteOrder(req, res, next) {
      try {
         const orders = req.body.orders;
         if (orders) {
            await orders.forEach(async (order) => {
               const removedOrder = await Order.findByIdAndRemove(order);
               if (removedOrder) {
                  await removedOrder.orderItems.map(async (orderItem) => {
                     await OrderItem.findByIdAndRemove(orderItem);
                  });
               } else {
                  throw BaseError.NotFound("The order is not found");
               }
            });
            return res.status(200).json({
               success: true,
               message: "The order was deleted.",
            });
         } else {
            throw BaseError.BadRequest("The are not orders to delete");
         }
      } catch (error) {
         next(error);
      }
   }

   async getTotalSales(req, res, next) {
      try {
         const totalSales = await Order.aggregate([
            { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
         ]);

         if (!totalSales) {
            throw BaseError.BadRequest("The total sales is not calculated");
         }

         res.send({ totalsales: totalSales.pop().totalsales });
      } catch (error) {
         next(error);
      }
   }

   async getOrderCount(req, res, next) {
      try {
         const orderCount = await Order.countDocuments();

         if (!orderCount) {
            throw BaseError.BadRequest(
               "There is error in calculating total count of orders"
            );
         }
         res.send({
            orderCount: orderCount,
         });
      } catch (error) {
         next(error);
      }
   }

   async getUserOrders(req, res, next) {
      try {
         if (!mongoose.isValidObjectId(req.params.userid)) {
            throw BaseError.BadRequest("Invalid User ID");
         }
         const userOrderList = await Order.find({ user: req.params.userid })
            .populate({
               path: "orderItems",
               populate: { path: "product", populate: "category" },
            })
            .sort({ dateOrdered: -1 });

         if (!userOrderList) {
            throw BaseError.NotFound("The orders of user are not found");
         }
         res.send(userOrderList);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new OrderController();
