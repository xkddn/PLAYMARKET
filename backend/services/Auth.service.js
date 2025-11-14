const jwt = require("jsonwebtoken");
const UserService = require("./User.service");

class AuthService {
  static generateAccessToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
  }

  static generateRefreshToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
  }

  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      const err = new Error("Token invalide ou expiré");
      err.status = 403;
      throw err;
    }
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      const err = new Error("Refresh token invalide ou expiré");
      err.status = 403;
      throw err;
    }
  }

  static async register({ email, password, name, role }) {
    try {
      const user = await UserService.createUser({ email, password, name, role });
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return {
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  static async login({ email, password }) {
    try {
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        const error = new Error("Email ou mot de passe incorrect");
        error.status = 401;
        throw error;
      }

      const isPasswordValid = await UserService.validatePassword(
        password,
        user.password_hash
      );
      if (!isPasswordValid) {
        const error = new Error("Email ou mot de passe incorrect");
        error.status = 401;
        throw error;
      }

      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return {
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  static async refreshAccessToken(refreshToken) {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);
      const user = await UserService.getUserById(decoded.id);
      const newAccessToken = this.generateAccessToken(user);

      return { accessToken: newAccessToken };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;

