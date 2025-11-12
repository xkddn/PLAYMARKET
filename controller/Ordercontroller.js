const Orders = require("../model/Order.model");
const OrderItems = require("../model/OrderItem.model");

class OrdersController {
  static async getAll(req, res, next) {
    try {
      const orders = await Orders.findAll();
      res.json(orders);
    } catch (e) {
      next(e);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Orders.findById(id);
      if (!order) {
        return res.status(404).json({ error: "Commande non trouvée" });
      }
      const items = await OrderItems.findByOrderId(id);
      res.json({ ...order, items });
    } catch (e) {
      next(e);
    }
  }

  static async getByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const orders = await Orders.findByUserId(userId);
      res.json(orders);
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const { user_id, items } = req.body;
      if (!user_id || !items || items.length === 0) {
        return res.status(400).json({ error: "user_id et items requis" });
      }

      const total = items.reduce(
        (sum, item) => sum + item.quantity * item.unit_price,
        0
      );

      const order = await Orders.createOne({ user_id, total });

      for (const item of items) {
        await OrderItems.createOne({
          order_id: order.id,
          game_id: item.game_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        });
      }

      const orderItems = await OrderItems.findByOrderId(order.id);
      res.status(201).json({ ...order, items: orderItems });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = OrdersController;
