const express = require("express");
const router = express.Router();
const GamesController = require("../controller/Productscontroller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/roles.middleware");
const {
  validateGame,
  validateStock,
  validateId,
} = require("../middlewares/validation.middleware");

router.get("/", GamesController.getAll);
router.get("/:id", validateId, GamesController.getById);
router.post("/", authenticateToken, requireAdmin, validateGame, GamesController.create);
router.patch("/:id/stock", authenticateToken, requireAdmin, validateId, validateStock, GamesController.updateStock);

module.exports = router;
