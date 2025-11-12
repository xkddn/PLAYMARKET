const express = require("express");
const router = express.Router();
const OrdersController = require("../controller/Ordercontroller");

router.get("/", OrdersController.getAll);
router.get("/:id", OrdersController.getById);
router.get("/user/:userId", OrdersController.getByUserId);
router.post("/", OrdersController.create);

module.exports = router;
