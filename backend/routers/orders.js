const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.get(`/`, orderController.getOrder);
router.get(`/:id`, orderController.getOneOrder);
router.get(`/saled/:id`, orderController.getSaledCount);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/", orderController.deleteOrder);
router.get("/get/totalsales", orderController.getTotalSales);
router.get(`/get/count`, orderController.getOrderCount);
router.get(`/get/userorders/:userid`, orderController.getUserOrders);

module.exports = router;
