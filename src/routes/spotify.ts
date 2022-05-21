import {Router} from "express";
import ApiResponse from "../ApiResponse.js";
import {Database} from "../libs/database.js";

/**
 * Generates the router for the Spotify collection
 * @param {Database} db - The database to use
 * @returns {Router} - The router for the Spotify collection
 * @author DG
 */
export default function(db: Database): Router {
    const router = Router();

    router.get("/episodes", async (req, res) => {
        db.collection("spotify").find({}).toArray((err, docs) => {
            if (err) {
                res.json(ApiResponse.Error("Error getting spotify episodes"));
            } else {
                res.json(ApiResponse.Response(docs));
            }
        });
    });

    return router;
}