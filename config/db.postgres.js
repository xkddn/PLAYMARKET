require("dotenv").config();
const pgp = require("pg-promise")();

const dbConfig = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
};

const db = pgp(dbConfig);

const connectPostgreSQL = async () => {
  try {
    await db.connect();
    console.log("✅ Connexion PostgreSQL établie avec succès");
    return true;
  } catch (error) {
    console.error("❌ Erreur de connexion PostgreSQL :", error.message);
    throw error;
  }
};

module.exports = { db, connectPostgreSQL };
