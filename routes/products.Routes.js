const express = require("express");
const router = express.Router();
const GamesController = require("../controller/Productscontroller");

router.get("/", GamesController.getAll);
router.get("/:id", GamesController.getById);
router.post("/", GamesController.create);
router.patch("/:id/stock", GamesController.updateStock);

module.exports = router;
