const router = require("express").Router();
const ctrl = require("../controller/Usercontroller.js");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/roles.middleware");
const { validateId } = require("../middlewares/validation.middleware");

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Récupérer tous les utilisateurs (Admin uniquement)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Permission refusée (admin requis)
 */
router.get("/", authenticateToken, requireAdmin, ctrl.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Récupérer un utilisateur par ID (Admin uniquement)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Permission refusée (admin requis)
 */
router.get("/:id", authenticateToken, requireAdmin, validateId, ctrl.getUserById);

module.exports = router;
