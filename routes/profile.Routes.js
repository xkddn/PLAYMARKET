const express = require("express");
const router = express.Router();
const MongoController = require("../controller/Profilecontroller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/roles.middleware");

/**
 * @swagger
 * /api/mongo/gamedetails:
 *   get:
 *     tags: [MongoDB]
 *     summary: Récupérer tous les détails de jeux
 *     responses:
 *       200:
 *         description: Liste des détails de jeux
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameDetails'
 */
router.get("/gamedetails", MongoController.getAllGameDetails);

/**
 * @swagger
 * /api/mongo/gamedetails/{gameId}:
 *   get:
 *     tags: [MongoDB]
 *     summary: Récupérer les détails d'un jeu
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du jeu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameDetails'
 *       404:
 *         description: Détails non trouvés
 */
router.get("/gamedetails/:gameId", MongoController.getGameDetails);

/**
 * @swagger
 * /api/mongo/gamedetails:
 *   post:
 *     tags: [MongoDB]
 *     summary: Créer des détails de jeu (Admin uniquement)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameDetails'
 *     responses:
 *       201:
 *         description: Détails créés
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Permission refusée (admin requis)
 */
router.post("/gamedetails", authenticateToken, requireAdmin, MongoController.createGameDetails);

/**
 * @swagger
 * /api/mongo/gamedetails/{gameId}:
 *   put:
 *     tags: [MongoDB]
 *     summary: Mettre à jour les détails d'un jeu (Admin uniquement)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameDetails'
 *     responses:
 *       200:
 *         description: Détails mis à jour
 *       404:
 *         description: Détails non trouvés
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Permission refusée (admin requis)
 */
router.put("/gamedetails/:gameId", authenticateToken, requireAdmin, MongoController.updateGameDetails);

/**
 * @swagger
 * /api/mongo/activity:
 *   get:
 *     tags: [MongoDB]
 *     summary: Récupérer tous les logs d'activité (Admin uniquement)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActivityLog'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Permission refusée (admin requis)
 */
router.get("/activity", authenticateToken, requireAdmin, MongoController.getAllActivity);

/**
 * @swagger
 * /api/mongo/activity:
 *   post:
 *     tags: [MongoDB]
 *     summary: Logger une activité utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityLog'
 *     responses:
 *       201:
 *         description: Log créé
 *       401:
 *         description: Non authentifié
 */
router.post("/activity", authenticateToken, MongoController.logActivity);

/**
 * @swagger
 * /api/mongo/activity/{userId}:
 *   get:
 *     tags: [MongoDB]
 *     summary: Récupérer les logs d'un utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des logs de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActivityLog'
 *       401:
 *         description: Non authentifié
 */
router.get("/activity/:userId", authenticateToken, MongoController.getUserActivity);

/**
 * @swagger
 * /api/mongo/recommendations:
 *   get:
 *     tags: [MongoDB]
 *     summary: Récupérer toutes les recommandations (Admin uniquement)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des recommandations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Permission refusée (admin requis)
 */
router.get("/recommendations", authenticateToken, requireAdmin, MongoController.getAllRecommendations);

/**
 * @swagger
 * /api/mongo/recommendations/{userId}:
 *   get:
 *     tags: [MongoDB]
 *     summary: Récupérer les recommandations d'un utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recommandations de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendation'
 *       404:
 *         description: Recommandations non trouvées
 *       401:
 *         description: Non authentifié
 */
router.get("/recommendations/:userId", authenticateToken, MongoController.getRecommendations);

/**
 * @swagger
 * /api/mongo/recommendations/{userId}:
 *   put:
 *     tags: [MongoDB]
 *     summary: Mettre à jour les recommandations d'un utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     gameId: { type: integer, example: 1 }
 *                     score: { type: number, example: 0.88 }
 *                     reason: { type: string, example: Vous aimez les jeux d'action }
 *     responses:
 *       200:
 *         description: Recommandations mises à jour
 *       401:
 *         description: Non authentifié
 */
router.put("/recommendations/:userId", authenticateToken, MongoController.updateRecommendations);

module.exports = router;
