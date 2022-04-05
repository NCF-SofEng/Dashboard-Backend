import fetch from "node-fetch";
import { TwitterSearchResult } from "../types/types.js";

export class Twitter {
    private root: string = "https://api.twitter.com/1.1/";

    private token: string;
    constructor(_token: string) {
        this.token = _token;
    }

    public getTweets(query: string): Promise<TwitterSearchResult> {
        return fetch(this.root + "search/tweets.json?q=" + query, {
            headers: {
                Authorization: "Bearer " + this.token,
            },
        }).then((res) => res.json()) as Promise<TwitterSearchResult>;
    }
}