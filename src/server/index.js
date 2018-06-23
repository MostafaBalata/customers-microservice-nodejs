import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { api } from "../api/customers";

/**
 * Start is function that is running the service.
 * @param {*} options 
 */
export const start = async(options) => {
  if (!options.repository) {
    throw new Error("The server must be started with a connected repository");
  }
  if (!options.port) {
    throw new Error("The server must be started with an available port");
  }

  const app = express();
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(express.json());

  app.use((err, req, res, next) => {
    /**
     * @TODO: Error should be log 
     */
    res.status(500).send("Something went wrong!");
    next();
  });

  api(app, options);

  return await app.listen(options.port);
};