import { Router } from "express";
import ApiResponse from "../ApiResponse.js";
import { Database } from "../libs/database.js";

export default function(db: Database): Router {
    const router = Router();

    router.get("/tweets", (req, res) => {
        db.collection("tweets").find({}).toArray((err, docs) => {
            if (err) {
                res.json(ApiResponse.Error("Error getting tweets."));
            } else {
                res.json(ApiResponse.Response(docs));
            }
        });
    });

    return router;
}