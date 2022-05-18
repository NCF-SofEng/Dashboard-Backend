import { Router } from "express";
import ApiResponse from "../ApiResponse.js";
import { Database } from "../libs/database.js";
import MongoDB from "mongodb";

/** E.F.
 * Generates the router for the Chatboard API.
 * @param db The database to use
 * @returns The router for the chatboard.
 */
export default function(db: Database): Router {
    const router = Router();

    // Query the database for all messages, then return them as a Api response.
    router.get("/recentMessages", async (req, res) => {
        const messages = await db.collection("messages").find({});
        res.json(ApiResponse.Response(messages));
    });

    // Create a new message based on the request body.
    router.post("/createMessage", async (req, res) => {
        if (!req.body.message || !req.body.title) {
            return res.json(ApiResponse.Error("Missing message or title."));
        }

        // Insert the new element into the database.
        db.collection("messages").insertOne({
            message: req.body.message,
            title: req.body.title,
            date: Date.now(),
            upvotes: 0,
            location: req.body.location ? req.body.location : null,
            attachment: req.body.attachment ? req.body.attachment : null
        })

        res.json(ApiResponse.Response("OK"));
    })

    // Same as getMessages, but actually works!
    router.get("/getMessages", async (req, res) => {
        await db.collection("messages").find({}).toArray((err, docs) => {
            if (err) {
                res.json(ApiResponse.Error("Error getting messages."));
            } else {
                res.json(ApiResponse.Response(docs));
            }
        });
    })

    return router;
}