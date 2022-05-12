import express from "express";
import cors from "cors";

import { Database } from "./libs/database.js";
import { Logger, MiddlewareLogger } from "./libs/logging.js";

import MediaRouter from "./routes/media.js";
import AnalyticsRouter from "./routes/analytics.js";
import MessageboardRouter from "./routes/messageboard.js";
import SensorRouter from "./routes/sensors.js";
import SpotifyRouter from "./routes/spotify.js";

// Initilize dotenv & the Logging System
import dotenv from "dotenv";
import { TaskManager } from "./tasks/manager.js";
dotenv.config();
Logger.init(3);

const server = express();
const database = new Database(process.env.MongoAuthenticatedURI as string, "RedTideDashboard");
const taskManager = new TaskManager(database);

const port = parseInt(process.env.WebServerPort as any) ||
    Logger.warn("No Port Specified, falling back to 8080.") || 8080;

// Give our Server CORS support (for api calls)
server.use(cors());

// Give our Server JSON support
server.use(express.json({
    limit: "20mb"
}));

// Give our server Middleware to handle logging.
server.use(MiddlewareLogger);

// Route all endpoint groups
server.use("/api/media", MediaRouter(database));
server.use("/api/analytics", AnalyticsRouter(database));
server.use("/api/messageboard", MessageboardRouter(database));
server.use("/api/sensors", SensorRouter(database));
server.use("/api/spotify", SpotifyRouter(database));

// Test spotify
import {Spotify} from "./libs/spotify.js";
const spotify = new Spotify(process.env.SpotifyApiClient as string, process.env.SpotifyApiSecret as string);

Promise.all([server.listen(port), database.connect(), spotify.generateToken()]).then(() => {
    Logger.info(`Web Server running on port ${port}`);

    spotify.searchSpotify("harmful algal bloom", "episode");

    taskManager.start();
})