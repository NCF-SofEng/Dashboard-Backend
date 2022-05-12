import fetch from "node-fetch";

export class Spotify {
    private root: string = "https://api.spotify.com/v1/";

    private client_id: string;
    private client_secret: string;
    private token: string = '';
    constructor(_client_id: string, _client_secret: string) {
        this.client_id = _client_id;
        this.client_secret = _client_secret;
    }

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

    public searchSpotify(query: string, type: string) {
        fetch(`${encodeURIComponent(this.root)}search?q=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}`,
            {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.token,
            }
        }).then((res) => res.json()).then((data: any) => console.log(data, `${this.root}search?q=${query}&type=${type}`));
    }
}