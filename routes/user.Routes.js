const router = require("express").Router();
const ctrl = require("../controller/Usercontroller.js");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/roles.middleware");
const { validateId } = require("../middlewares/validation.middleware");

router.get("/", authenticateToken, requireAdmin, ctrl.getUsers);
router.get("/:id", authenticateToken, requireAdmin, validateId, ctrl.getUserById);

module.exports = router;
