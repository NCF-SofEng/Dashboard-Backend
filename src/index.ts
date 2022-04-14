import express from "express";

import { Database } from "./libs/database.js";
import { Scraper } from "./libs/scraper.js";
import { Twitter } from "./libs/twitter.js";
import { Logger, MiddlewareLogger } from "./libs/logging.js";

import MediaRouter from "./routes/media.js";
import AnalyticsRouter from "./routes/analytics.js";
import MessageboardRouter from "./routes/messageboard.js";

// Initilize dotenv & the Logging System
import dotenv from "dotenv";
import { TaskManager } from "./tasks/manager.js";
dotenv.config();
Logger.init(3);

const server = express();
const database = new Database(process.env.MongoAuthenticatedURI as string, "RedTideDashboard");
const twitter = new Twitter(process.env.TwitterBearer as string);
const taskManager = new TaskManager(database);

const scraper = new Scraper();

const port = parseInt(process.env.WebServerPort as any) ||
    Logger.warn("No Port Specified, falling back to 8080.") || 8080;

// Give our Server JSON support
server.use(express.json());

// Give our server Middleware to handle logging.
server.use(MiddlewareLogger);

// Route all endpoint groups
server.use("/api/media", MediaRouter(database));
server.use("/api/analytics", AnalyticsRouter(database));
server.use("/api/messageboard", MessageboardRouter(database));

Promise.all([server.listen(port), database.connect()]).then(() => {
    Logger.info(`Web Server running on port ${port}`);
    taskManager.start();
})