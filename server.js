require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectMongoDB = require("./config/db.mongo");
const { connectPostgreSQL } = require("./config/db.postgres");
const app = express();
const PORT = process.env.PORT || 3000;

// BDD
const initializeDatabases = async () => {
  try {
    await connectMongoDB();
    await connectPostgreSQL();
  } catch (error) {
    console.error("❌ Erreur base de données:", error.message);
    process.exit(1);
  }
};
initializeDatabases();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// ROUTES
const gamesRoutes = require("./routes/products.Routes");
app.use("/api/games", gamesRoutes);

const userRoutes = require("./routes/user.Routes");
app.use("/api/users", userRoutes);

const mongoRoutes = require("./routes/profile.Routes");
app.use("/api/mongo", mongoRoutes);

const orderRoutes = require("./routes/order.Routes");
app.use("/api/orders", orderRoutes);

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    database: "connected",
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route inconnu" });
});

app.use((err, req, res, next) => {
  console.error(" Erreur serveur:", err.message);
  res.status(500).json({ error: "Erreur interne serveur" });
});

app.listen(PORT, () => console.log(`Serveur OK : http://localhost:${PORT}`));
