import { Repository } from "./repository/repository";
import { dbConnect, dbSettings, serverSettings } from "./config";
import { EventEmitter } from "events";
import { start } from "./server";

const mediator = new EventEmitter();

process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.error("Unhandled Exception", err);
});

process.on("uncaughtRejection", (err) => {
  // eslint-disable-next-line no-console
  console.error("Unhandled Rejection", err);
});

mediator.on("db.error", (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

mediator.on("db.ready", (db) => {
  const repository = new Repository(db);
  start({
    port: serverSettings.port,
    repository
  }).then(app => {
    // eslint-disable-next-line no-console
    console.log(`Server started successfully, running on port: ${serverSettings.port}.`);
    app.on("close", () => {
      repository.disconnect();
    });
  });

});

dbConnect(dbSettings, mediator);
mediator.emit("boot.ready");