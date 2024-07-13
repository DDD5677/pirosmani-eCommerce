const express = require("express");
const router = express.Router();
const reserveController = require("../controllers/reserve.controller");

router.get(`/`, reserveController.getReserve);
router.get("/:id", reserveController.getOneReserve);
router.post("/", reserveController.createReserve);
router.put("/", reserveController.updateReserve);
router.delete("/", reserveController.deleteReserve);

module.exports = router;
