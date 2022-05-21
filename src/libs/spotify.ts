import fetch from "node-fetch";

/**
 * Class handling Spotify API interactions.
 * @author DG
 */
export class Spotify {
    private root: string = "https://api.spotify.com/v1/";
    private client_id: string;
    private client_secret: string;
    private token: string = '';

    constructor(_client_id: string, _client_secret: string) {
        this.client_id = _client_id;
        this.client_secret = _client_secret;
    }

    /**
     * Generates bearer token for spotify api using client id and client secret.
     */
    public async generateToken() {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + Buffer.from(this.client_id + ':' + this.client_secret).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials"
        }).then((res) => res.json()) as any;

        this.token = result.access_token;
    }

    /**
     * Queries the Spotify API search endpoint.
     * @param {string} query - The search query
     * @param {string} type - The type of media
     * @returns {Promise<any>} - JSON object containing array of found items
     */
    public searchSpotify(query: string, type: string): Promise<any> {
        return fetch(`${this.root}search?q=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }).then((res) => res.json()) as any;
    }

    /**
     * Retrieve all items from a given playlist.
     * @param {string} id - Unique playlist ID
     * @returns {Promise<any>} - JSON object containing array of items from playlist
     */
    public getPlaylistItems(id: string): Promise<any> {
        return fetch(`${this.root}playlists/${id}/tracks`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }).then((res) => res.json()) as any;
    }
}