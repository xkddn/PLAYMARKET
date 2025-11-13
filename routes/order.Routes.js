const express = require("express");
const router = express.Router();
const OrdersController = require("../controller/Ordercontroller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/roles.middleware");
const { validateId } = require("../middlewares/validation.middleware");

router.get("/", authenticateToken, requireAdmin, OrdersController.getAll);
router.get("/:id", authenticateToken, validateId, OrdersController.getById);
router.get("/user/:userId", authenticateToken, OrdersController.getByUserId);
router.post("/", authenticateToken, OrdersController.create);

module.exports = router;
