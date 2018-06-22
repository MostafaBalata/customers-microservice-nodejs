import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { api } from "../api/customers";

export const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repository) {
      reject(new Error("The server must be started with a connected repository"));
    }
    if (!options.port) {
      reject(new Error("The server must be started with an available port"));
    }

    const app = express();
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(express.json());

    app.use((err, req, res, next) => {
      reject(new Error("Something went wrong!, err:" + err));
      res.status(500).send("Something went wrong!");
      next();
    });

    api(app, options);

    const server = app.listen(options.port, () => resolve(server));
  });
};