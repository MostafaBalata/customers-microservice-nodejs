const MongoClient = require("mongodb").MongoClient;

export const dbConnect = (options, mediator) => {
  mediator.once("boot.ready", () => {
    MongoClient.connect(`mongodb://${options.server}/`, { native_parser: true }, (err, client) => {
      if (err) {
        mediator.emit("db.error", err);
      }
      console.log("DB", options.db)
      const db = client.db(options.db);
      mediator.emit("db.ready", db);
    });
  });
};