import fetch from "node-fetch";
import { SearchMetadata, Status } from "../types/types.js";

export class Twitter {
    private root: string = "https://api.twitter.com/1.1/";

    private token: string;
    constructor(_token: string) {
        this.token = _token;
    }

    public getTweets(query: string): Promise<TwitterSearchResult> {
        return fetch(this.root + "search/tweets.json?q=" + encodeURIComponent(query), {
            headers: {
                Authorization: "Bearer " + this.token,
            },
        })
        .then((res) => res.json())
        .then((res) => new TwitterSearchResult(res)) as Promise<TwitterSearchResult>;
    }
}

export class TwitterSearchResult {
    public statuses: Array<Status>;
    public search_metadata: SearchMetadata; 

    constructor(json: any) {
        this.statuses = json.statuses;
        this.search_metadata = json.search_metadata;
    }

    public get originalTweets(): Array<Status> {
        return this.statuses.filter(status => !status.text.startsWith("RT"));
    }
}