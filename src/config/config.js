export const dbSettings = {
  production: {
    db: process.env.DB || "customers",
    server: process.env.DB_SERVER || "localhost:27017",
  },
  testing: {
    db: "customers_tests",
    server: "localhost:27017",
  }

};

export const serverSettings = {
  port: process.env.PORT || 3000,
  url: process.env.HOST_URL || "localhost",
};