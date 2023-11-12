const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const OrderItem = require("../models/order-items");
const User = require("../models/user");
const mongoose = require("mongoose");

router.get(`/`, async (req, res, next) => {
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
         res.status(500).json({
            success: false,
         });
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
});

router.get(`/:id`, async (req, res, next) => {
   try {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).json({
            success: false,
            message: "Invalid Id",
         });
      }
      const order = await Order.findById(req.params.id)
         .populate("user")
         .populate({
            path: "orderItems",
            populate: "product",
         });
      if (!order) {
         res.status(500).json({
            success: false,
         });
      }
      res.status(200).send(order);
   } catch (error) {
      next(error);
   }
});

router.get(`/saled/:id`, async (req, res, next) => {
   try {
      const orderItemsList = await OrderItem.find({
         product: req.params.id,
      });

      if (!orderItemsList) {
         res.status(500).json({
            success: false,
            msg: "smth wrong",
         });
      }
      let saledCount = 0;
      orderItemsList.forEach((item) => {
         saledCount += item.quantity;
      });
      res.status(200).send({ saledCount });
   } catch (error) {
      next(error);
   }
});

router.post("/", async (req, res, next) => {
   try {
      if (req.body.orderItems.length === 0) {
         return res.status(404).json({ orderItems: "the basket is empty!" });
      }
      console.log("req", req.body);
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
         res.status(404).send("total price is not accepted");
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
         return res.status(404).send("the order cannot be created!");
      }

      res.send(order);
   } catch (error) {
      next(error);
   }
});

router.put("/:id", async (req, res, next) => {
   try {
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
         return res.status(404).send("the order cannot be updated!");
      }

      res.status(200).send(order);
   } catch (error) {
      next(error);
   }
});

router.delete("/", async (req, res, next) => {
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
               return res.status(404).json({
                  success: false,
                  message: "The order is not found.",
               });
            }
         });
         return res.status(200).json({
            success: true,
            message: "The order was deleted.",
         });
      } else {
         return res.status(200).json({
            success: true,
            message: "There is not order in request.",
         });
      }
   } catch (error) {
      next(error);
   }
});

router.get("/get/totalsales", async (req, res) => {
   const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
   ]);

   if (!totalSales) {
      return res.status(400).send("The sales cannot be generated");
   }

   res.send({ totalsales: totalSales.pop().totalsales });
});

router.get(`/get/count`, async (req, res) => {
   const orderCount = await Order.countDocuments();

   if (!orderCount) {
      res.status(500).json({
         success: false,
      });
   }
   res.send({
      orderCount: orderCount,
   });
});

router.get(`/get/userorders/:userid`, async (req, res, next) => {
   try {
      const userOrderList = await Order.find({ user: req.params.userid })
         .populate({
            path: "orderItems",
            populate: { path: "product", populate: "category" },
         })
         .sort({ dateOrdered: -1 });

      if (!userOrderList) {
         res.status(500).json({
            success: false,
         });
      }
      res.send(userOrderList);
   } catch (error) {
      next(error);
   }
});

module.exports = router;
