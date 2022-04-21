import { Router } from "express";
import ApiResponse from "../ApiResponse.js";
import { Database } from "../libs/database.js";
import MongoDB from "mongodb";

export default function(db: Database): Router {
    const router = Router();

    router.get("/recentMessages", async (req, res) => {
        const messages = await db.collection("messages").find({});
        res.json(ApiResponse.Response(messages));
    });

    router.post("/createMessage", async (req, res) => {
        console.log(req.body);

        if (!req.body.message || !req.body.title) {
            return res.json(ApiResponse.Error("Missing message or title."));
        }

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

    // Pls fix ender this doesn't work <3
    router.get("/getMessages", async (req, res) => {
        await db.collection("messages").find({}).toArray((err, docs) => {
            if (err) {
                res.json(ApiResponse.Error("Error getting messages."));
            } else {
                res.json(ApiResponse.Response(docs));
            }
        });
    })

    // pls test this ender it still probably doesn't work <3
    router.get("/upvote", (req, res) => {
        const messageId = req.query.id;

        if (!messageId) {
            return res.json(ApiResponse.Error("Missing message id."));
        }

        db.collection("messages").updateOne({
            _id: new MongoDB.ObjectId(messageId as string)
        }, {
            $inc: {
                upvotes: 1
            }
        });

        return res.json(ApiResponse.Response("OK"));

    })

    return router;
}