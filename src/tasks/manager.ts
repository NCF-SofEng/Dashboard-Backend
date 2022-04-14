import { Logger } from "../libs/logging.js";
import chalk from "chalk";
import { Twitter } from "../libs/twitter.js";
import { Database } from "../libs/database.js";

export class TaskManager {
    private interval: NodeJS.Timer;
    private db: Database;

    constructor(db: Database) {
        this.db = db;
        this.interval = null as any;
    }

    public async start() {
        this.runWrapper();
        this.interval = setInterval(async () => {
            this.runWrapper();
        }, 1000 * 60 * 60 * 24);
    }

    /**
     * This function exists just to contain the logic for one ran task, including the logging info.
     * I had to do this because it needs to run once when the program starts, and then once every 24 hours.
     */
    public async runWrapper() {
        // Time the execution of this.run()
        const start = Date.now();
        Logger.info("Running daily tasks...");
        await this.run();
        Logger.info(`Daily tasks completed in ${chalk.blue((Date.now() - start) / 1000).toString()} seconds.`);
    }

    public async run() {
        await Promise.all([
            this.TwitterJob()
        ])
    }
    
    public async TwitterJob() {
        const twitter = new Twitter(process.env.TwitterBearer as string);
        const tweets = await twitter.getTweets("#RedTide")
            .then((tweets) => tweets.statuses)
            .then((tweets) => tweets.map((tweet) => {
                (tweet as any)["_id"] = tweet.id;
                return tweet;
            }));

            try {
                const res = await this.db.collection("tweets").insertMany(tweets, { ordered: false });
                Logger.info(`Inserted ${res.insertedCount} tweets into the database.`);
            } catch (e) {
                Logger.error(`Error inserting tweets into the database: ${e}`);
            }
    }
}