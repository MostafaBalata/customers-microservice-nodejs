export const dbSettings = {
  db: process.env.DB || "customers",
  server: process.env.DB_SERVER || "localhost:27017",
  dbParameters: () => ({
    w: "majority",
    wtimeout: 10000,
    j: true,
    readPreference: "ReadPreference.SECONDARY_PREFERRED",
    native_parser: false
  }),
  serverParameters: () => ({
    autoReconnect: true,
    poolSize: 10,
    socketoptions: {
      keepAlive: 300,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000
    }
  }),
};

export const serverSettings = {
  port: process.env.PORT || 3000,
};