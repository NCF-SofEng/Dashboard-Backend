import {Router} from "express";
import ApiResponse from "../ApiResponse.js";
import {Database} from "../libs/database.js";

export default function(db: Database): Router {
    const router = Router();

    router.get("/spotify", async (req, res) => {
        const episodes = await db.collection("spotify").find({});
        res.json(ApiResponse.Response(episodes));
    });

    return router;
}