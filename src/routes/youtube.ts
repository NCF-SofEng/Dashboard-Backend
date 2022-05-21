import { Router } from "express";
import ApiResponse from "../ApiResponse.js";
import { Database } from "../libs/database.js";
/* @author D.R. 
* @ param db: The database that we'll be connecting to.
* connects the frontend to the backend, allowing it to ask for information pulled from youtube in the mongodb database.
* In essence, this allows the youtubebody.js to ask the database for info.
*/ 
export default function(db: Database): Router {
    const router = Router();
    router.get("/videos", (req, res) => {
        db.collection("youtube-videos").find({}).toArray((err, docs) => {
            if (err) {
                res.json(ApiResponse.Error("Error getting youtube videos."));
            } else {
                res.json(ApiResponse.Response(docs));
            }
        });
    });

    return router;
}

