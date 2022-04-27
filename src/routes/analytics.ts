import { Router } from "express";
import ApiResponse from "../ApiResponse.js";
import { Database } from "../libs/database.js";
import { TaskManager } from "../tasks/manager.js";

export default function(db: Database): Router {
    const router = Router();

    router.get("/refreshtime", (req, res) => {
        const date = TaskManager.lastExecution();

        // Return the miliseconds since the last execution.
        res.json(ApiResponse.Response(Date.now() - date.getMilliseconds()));
    });

    router.get("/onlinetime", (req, res) => {
        const date = TaskManager.startTime();

        // Return the miliseconds since started.
        res.json(ApiResponse.Response(Date.now() - date.getMilliseconds()));
    });

    router.get("/recent", (req, res) => {
        
    });

    return router;
}