import MongoDB from "mongodb";
import { Logger } from "./logging.js";

export class Database {
    private _connectionURL: string;
    private _database: string;
    private _client: MongoDB.MongoClient
        = null as any;

    constructor(uri: string, database: string) {
        this._connectionURL = uri;
        this._database = database;
    };

    /**
     * Gets the database client session if it exists. If it doesn't, throw an error.
     * This is to make sure the database is never called before it's ready!
     */
    public get client() {
        if (this._client === null) {
            Logger.warn("Database Getter called without instantiating the connection.");
            throw new Error("Client is not connected. Please call <Database>.connect() first.");
        }
        return this._client;
    }

    /**
     * A shortcut to get a collection from the default database.
     * @param collectionName The name of the collection to get.
     * @returns Collection The queryable collection.
     */
    public collection(collectionName: string) {
        return this._client.db(this._database)
            .collection(collectionName);
    }

    /**
     * Asynchronously connects to the database, resolving when the connection is established.
     */
    public async connect(): Promise<void> {
        Logger.info("Connecting to database...");
        this._client = new MongoDB.MongoClient(this._connectionURL);
        await this._client.connect();
        Logger.info("Database Connected.")
    }

}