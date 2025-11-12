const Games = require("../model/Products.model");

class GamesController {
  static async getAll(req, res, next) {
    try {
      const games = await Games.findAll();
      res.json(games);
    } catch (e) {
      next(e);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Games.findById(id);
      if (!game) {
        return res.status(404).json({ error: "Jeu non trouvé" });
      }
      res.json(game);
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const { title, price, stock } = req.body;
      if (!title || price === undefined) {
        return res.status(400).json({ error: "Title et price requis" });
      }
      const game = await Games.createOne({ title, price, stock });
      res.status(201).json(game);
    } catch (e) {
      next(e);
    }
  }

  static async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      if (stock === undefined) {
        return res.status(400).json({ error: "Stock requis" });
      }
      const game = await Games.updateStock(id, stock);
      res.json(game);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = GamesController;
