import { MongoClient } from "mongodb";

/**
 * Connect to database
 * @param {*} options 
 * @param {*} mediator 
 */
export const dbConnect = (options, mediator) => {
  mediator.once("boot.ready", () => {
    MongoClient.connect(`mongodb://${options.server}/`, { native_parser: true }, (err, client) => {
      if (err) {
        mediator.emit("db.error", err);
      }

      const db = client.db(options.db);
      mediator.emit("db.ready", db);
    });
  });
};