const MongoModels = require("../model/Profile.model");

class MongoController {
  static async getAllGameDetails(req, res, next) {
    try {
      const allDetails = await MongoModels.getAllGameDetails();
      res.json(allDetails);
    } catch (e) {
      next(e);
    }
  }

  static async getGameDetails(req, res, next) {
    try {
      const { gameId } = req.params;
      const details = await MongoModels.getGameDetails(parseInt(gameId));
      if (!details) {
        return res.status(404).json({ error: "Détails du jeu non trouvés" });
      }
      res.json(details);
    } catch (e) {
      next(e);
    }
  }

  static async createGameDetails(req, res, next) {
    try {
      const data = req.body;
      const details = await MongoModels.createGameDetails(data);
      res.status(201).json(details);
    } catch (e) {
      next(e);
    }
  }

  static async updateGameDetails(req, res, next) {
    try {
      const { gameId } = req.params;
      const data = req.body;
      const details = await MongoModels.updateGameDetails(
        parseInt(gameId),
        data
      );
      if (!details) {
        return res.status(404).json({ error: "Détails du jeu non trouvés" });
      }
      res.json(details);
    } catch (e) {
      next(e);
    }
  }

  static async getAllActivity(req, res, next) {
    try {
      const allLogs = await MongoModels.getAllActivity();
      res.json(allLogs);
    } catch (e) {
      next(e);
    }
  }

  static async logActivity(req, res, next) {
    try {
      const data = req.body;
      const log = await MongoModels.logActivity(data);
      res.status(201).json(log);
    } catch (e) {
      next(e);
    }
  }

  static async getUserActivity(req, res, next) {
    try {
      const { userId } = req.params;
      const logs = await MongoModels.getUserActivity(parseInt(userId));
      res.json(logs);
    } catch (e) {
      next(e);
    }
  }

  static async getAllRecommendations(req, res, next) {
    try {
      const allReco = await MongoModels.getAllRecommendations();
      res.json(allReco);
    } catch (e) {
      next(e);
    }
  }

  static async getRecommendations(req, res, next) {
    try {
      const { userId } = req.params;
      const reco = await MongoModels.getRecommendations(parseInt(userId));
      if (!reco) {
        return res.status(404).json({ error: "Recommandations non trouvées" });
      }
      res.json(reco);
    } catch (e) {
      next(e);
    }
  }

  static async updateRecommendations(req, res, next) {
    try {
      const { userId } = req.params;
      const { items } = req.body;
      const reco = await MongoModels.updateRecommendations(
        parseInt(userId),
        items
      );
      res.json(reco);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = MongoController;
