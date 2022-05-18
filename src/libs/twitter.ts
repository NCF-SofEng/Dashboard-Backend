import fetch from "node-fetch";
import { SearchMetadata, Status } from "../types/types.js";

/** E.F.
 * A simple class to handle fetching spotify information from the API.
 */
export class Twitter {
    private root: string = "https://api.twitter.com/1.1/";

    private token: string;
    constructor(_token: string) {
        this.token = _token;
    }

    /**
     * Fetches a json object for the twitter data.
     * @param query The query to search twitter for.
     * @returns A promise that resolves to the search data.
     */
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

/** E.F.
 * A class to handle the search result from twitter.
 * Basically made this so it was easy to filter out retweets without ugly code.
 */
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