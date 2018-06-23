import { dbSettings, serverSettings } from "./config";
import { dbConnect } from "./mongo";

/**
 * combining all the config in one object
 */
module.exports = Object.assign({}, { dbSettings, serverSettings, dbConnect });