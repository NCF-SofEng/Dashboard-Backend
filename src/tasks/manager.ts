import { Logger } from "../libs/logging.js";
import chalk from "chalk";
import { Twitter } from "../libs/twitter.js";
import { Database } from "../libs/database.js";
import { Youtube } from "../libs/youtube.js"

// A singleton class that manages the background tasks.
export class TaskManager {
    private lastExecution: Date = null as any;
    private static _instance: TaskManager;
    private interval: NodeJS.Timer;
    private startTime = new Date();
    private db: Database;

    constructor(db: Database) {
        TaskManager._instance = this;
        this.interval = null as any;
        this.db = db;
    }

    public static instance() {
        if (TaskManager._instance) {
            return TaskManager._instance;
        } else {
            throw new Error("TaskManager is not initialized.");
        }
    }

    // Some utility singleton functions for use in API routes.
    public static lastExecution(): Date {
        return TaskManager.instance().lastExecution;
    }

    public static startTime(): Date {
        return TaskManager.instance().startTime;
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

        // Update the last execution time.
        this.lastExecution = new Date();
    }

    public async run() {
        await Promise.all([
            this.TwitterJob(), new Youtube().getvideos(this.db)
        ])
    }
    
    /**
     * The job that handles twitter tasks, it just gets the most recewnt tweets and stores them in the database,
     * ignoring (erroring) on the ones that already exist. But fortunately, the errors don't crash it!
     */
    public async TwitterJob() {
        const twitter = new Twitter(process.env.TwitterBearer as string);
        const tweets = await twitter.getTweets("#RedTide")
            .then((tweets) => tweets.statuses)
            // Map the id field to the _id field that mongodb uses as a unique identifier
            .then((tweets) => tweets.map((tweet) => {
                (tweet as any)["_id"] = tweet.id;
                return tweet;
            }));

            try {
                // Insert all the tweets.
                const res = await this.db.collection("tweets").insertMany(tweets, { ordered: false });
                Logger.info(`Inserted ${res.insertedCount} tweets into the database.`);
            } catch (e) {
                Logger.error(`Error inserting tweets into the database: ${e}`);
            }
    }
}