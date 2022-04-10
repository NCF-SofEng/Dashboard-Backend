import express from "express";

import { Database } from "./libs/database.js";
import { Scraper } from "./libs/scraper.js";

import MediaRouter from "./routes/media.js";
import AnalyticsRouter from "./routes/analytics.js";
import MessageboardRouter from "./routes/messageboard.js";

// Initilize dotenv
import dotenv from "dotenv";
dotenv.config();

const server = express();
const database = new Database(process.env.MongoAuthenticatedURI as string, "RedTideDashboard");
const scraper = new Scraper();

// Give our Server JSON support
server.use(express.json());

// Route all endpoint groups
server.use("/api/media", MediaRouter(database));
server.use("/api/analytics", AnalyticsRouter(database));
server.use("/api/messageboard", MessageboardRouter(database));


// Wait for both the Server to start & the database to connect.
Promise.all([server.listen(8080), database.connect()]).then(() => {
    console.log("Server is running on port 8080.");
})