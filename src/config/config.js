export const dbSettings = {
  production: {
    db: process.env.DB || "customers",
    server: process.env.DB_SERVER || "mongo:27017",
  },
  testing: {
    db: "customers_tests",
    server: process.env.TEST_DB_SERVER || "mongo:27017",
  }
};

export const serverSettings = {
  port: process.env.PORT || 3000,
  url: process.env.HOST_URL || "localhost",
};