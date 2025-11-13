const express = require("express");
const router = express.Router();
const MongoController = require("../controller/Profilecontroller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/roles.middleware");

router.get("/gamedetails", MongoController.getAllGameDetails);
router.get("/gamedetails/:gameId", MongoController.getGameDetails);
router.post("/gamedetails", authenticateToken, requireAdmin, MongoController.createGameDetails);
router.put("/gamedetails/:gameId", authenticateToken, requireAdmin, MongoController.updateGameDetails);

router.get("/activity", authenticateToken, requireAdmin, MongoController.getAllActivity);
router.post("/activity", authenticateToken, MongoController.logActivity);
router.get("/activity/:userId", authenticateToken, MongoController.getUserActivity);

router.get("/recommendations", authenticateToken, requireAdmin, MongoController.getAllRecommendations);
router.get("/recommendations/:userId", authenticateToken, MongoController.getRecommendations);
router.put("/recommendations/:userId", authenticateToken, MongoController.updateRecommendations);

module.exports = router;
