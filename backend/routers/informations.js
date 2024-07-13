const express = require("express");
const router = express.Router();
const infoController = require("../controllers/info.controller");

router.get("/", infoController.getInfo);
router.post("/", infoController.createInfo);
router.put("/:id", infoController.updateInfo);

module.exports = router;
