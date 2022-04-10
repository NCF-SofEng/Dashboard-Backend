import { Router } from "express";
import { Database } from "../libs/database.js";

export default function(db: Database): Router {
    const router = Router();

    router.get("/recent", (req, res) => {

    });

    return router;
}