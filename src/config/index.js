import { dbSettings, serverSettings } from "./config";
import { dbConnect } from "./mongo";

module.exports = Object.assign({}, { dbSettings, serverSettings, dbConnect });