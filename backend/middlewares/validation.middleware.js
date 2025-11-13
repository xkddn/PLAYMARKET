const { body, param, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Erreur de validation",
      details: errors.array(),
    });
  }
  next();
};

const validateRegister = [
  body("email").isEmail().withMessage("Email invalide").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"),
  body("role").optional().isIn(["user", "admin"]).withMessage("Le rôle doit être 'user' ou 'admin'"),
  handleValidationErrors,
];

const validateLogin = [
  body("email").isEmail().withMessage("Email invalide").normalizeEmail(),
  body("password").notEmpty().withMessage("Mot de passe requis"),
  handleValidationErrors,
];

const validateGame = [
  body("title").notEmpty().withMessage("Le titre est requis").isLength({ max: 255 }).withMessage("Le titre ne doit pas dépasser 255 caractères"),
  body("price").isNumeric().withMessage("Le prix doit être un nombre").isFloat({ min: 0 }).withMessage("Le prix doit être positif"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Le stock doit être un nombre entier positif"),
  handleValidationErrors,
];

const validateStock = [
  body("stock").isInt({ min: 0 }).withMessage("Le stock doit être un nombre entier positif"),
  handleValidationErrors,
];

const validateId = [
  param("id").isInt({ min: 1 }).withMessage("ID invalide"),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateGame,
  validateStock,
  validateId,
  handleValidationErrors,
};

