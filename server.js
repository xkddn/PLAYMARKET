require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const connectMongoDB = require("./config/db.mongo");
const { connectPostgreSQL } = require("./config/db.postgres");
const { errorHandler, notFoundHandler } = require("./middlewares/error.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000', 'http://localhost:5173'];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Trop de requêtes, veuillez réessayer plus tard",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "Trop de tentatives de connexion, veuillez réessayer plus tard",
  },
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    database: "connected",
    version: "1.0.0",
  });
});

const authRoutes = require("./routes/auth.Routes");
app.use("/api/auth", authLimiter, authRoutes);

const gamesRoutes = require("./routes/products.Routes");
app.use("/api/games", gamesRoutes);

const userRoutes = require("./routes/user.Routes");
app.use("/api/users", userRoutes);

const mongoRoutes = require("./routes/profile.Routes");
app.use("/api/mongo", mongoRoutes);

const orderRoutes = require("./routes/order.Routes");
app.use("/api/orders", orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 PLAYMARKET API - SERVEUR ACTIF   ║
╠════════════════════════════════════════╣
║  Port: ${PORT}                            ║
║  URL: http://localhost:${PORT}            ║
║  Status: ✅ READY                       ║
╚════════════════════════════════════════╝
  `);
});
