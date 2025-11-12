const express = require("express");
const router = express.Router();
const MongoController = require("../controller/Profilecontroller");

router.get("/gamedetails", MongoController.getAllGameDetails);
router.get("/gamedetails/:gameId", MongoController.getGameDetails);
router.post("/gamedetails", MongoController.createGameDetails);
router.put("/gamedetails/:gameId", MongoController.updateGameDetails);

router.get("/activity", MongoController.getAllActivity);
router.post("/activity", MongoController.logActivity);
router.get("/activity/:userId", MongoController.getUserActivity);

router.get("/recommendations", MongoController.getAllRecommendations);
router.get("/recommendations/:userId", MongoController.getRecommendations);
router.put("/recommendations/:userId", MongoController.updateRecommendations);

module.exports = router;
