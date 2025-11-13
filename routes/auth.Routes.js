const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Authcontroller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validation.middleware");

router.post("/register", validateRegister, AuthController.register);
router.post("/login", validateLogin, AuthController.login);
router.post("/refresh", AuthController.refreshToken);
router.get("/me", authenticateToken, AuthController.getMe);

module.exports = router;

