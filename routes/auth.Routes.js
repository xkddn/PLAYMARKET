const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const AuthController = require("../controller/Authcontroller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validation.middleware");

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: "Trop de tentatives de rafraîchissement, veuillez réessayer plus tard",
  },
});

router.post("/register", validateRegister, AuthController.register);
router.post("/login", validateLogin, AuthController.login);
router.post("/refresh", refreshLimiter, AuthController.refreshToken);
router.get("/me", authenticateToken, AuthController.getMe);

module.exports = router;

