process.env.NODE_ENV = "test";
process.env.PORT = "3001";
process.env.MONGODB_URI = "mongodb://localhost:27017/playmarket_test";
process.env.PG_DATABASE = "playmarket_test";
process.env.JWT_SECRET = "test_secret";
process.env.JWT_REFRESH_SECRET = "test_refresh_secret";
process.env.ALLOWED_ORIGINS = "http://localhost:3000";

global.testUser = {
  email: "test@example.com",
  password: "Test1234",
  role: "user",
};

global.testAdmin = {
  email: "admin@example.com",
  password: "Admin1234",
  role: "admin",
};

