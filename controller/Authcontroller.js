const AuthService = require("../services/Auth.service");

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const result = await AuthService.register({ email, password, role });
      res.status(201).json({
        message: "Inscription réussie",
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });
      res.status(200).json({
        message: "Connexion réussie",
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token requis" });
      }
      if (typeof refreshToken !== 'string' || refreshToken.trim() === '') {
        return res.status(400).json({ error: "Format de refresh token invalide" });
      }
      const result = await AuthService.refreshAccessToken(refreshToken);
      res.status(200).json({
        message: "Token rafraîchi avec succès",
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req, res, next) {
    try {
      res.status(200).json({
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

