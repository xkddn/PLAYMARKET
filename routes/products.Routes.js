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

/**
 * @swagger
 * /api/games:
 *   get:
 *     tags: [Games]
 *     summary: Récupérer tous les jeux
 *     responses:
 *       200:
 *         description: Liste des jeux
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get("/", GamesController.getAll);

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     tags: [Games]
 *     summary: Récupérer un jeu par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du jeu
 *     responses:
 *       200:
 *         description: Détails du jeu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Jeu non trouvé
 *       400:
 *         description: ID invalide
 */
router.get("/:id", validateId, GamesController.getById);

/**
 * @swagger
 * /api/games:
 *   post:
 *     tags: [Games]
 *     summary: Créer un nouveau jeu (Admin uniquement)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, price]
 *             properties:
 *               title: { type: string, example: Elden Ring }
 *               price: { type: number, example: 59.99 }
 *               stock: { type: integer, example: 100, default: 0 }
 *     responses:
 *       201:
 *         description: Jeu créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Permission refusée (admin requis)
 */
router.post("/", authenticateToken, requireAdmin, validateGame, GamesController.create);

/**
 * @swagger
 * /api/games/{id}/stock:
 *   patch:
 *     tags: [Games]
 *     summary: Mettre à jour le stock d'un jeu (Admin uniquement)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [stock]
 *             properties:
 *               stock: { type: integer, example: 50 }
 *     responses:
 *       200:
 *         description: Stock mis à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Permission refusée (admin requis)
 *       404:
 *         description: Jeu non trouvé
 */
router.patch("/:id/stock", authenticateToken, requireAdmin, validateId, validateStock, GamesController.updateStock);

module.exports = router;
