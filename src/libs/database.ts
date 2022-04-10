import MongoDB from "mongodb";

export class Database {
    private _connectionURL: string;
    private _database: string;
    private _client: MongoDB.MongoClient
        = null as any;

    constructor(uri: string, database: string) {
        this._connectionURL = uri;
        this._database = database;
    };

    public get client() {
        if (this._client === null) {
            throw new Error("Client is not connected. Please call <Database>.connect() first.");
        }
        return this._client;
    }

    public collection(collectionName: string) {
        return this._client.db(this._database)
            .collection(collectionName);
    }

    public async connect(): Promise<void> {
        this._client = new MongoDB.MongoClient(this._connectionURL);
        await this._client.connect();
    }

}

export interface DatabaseTwitterTweet {

}