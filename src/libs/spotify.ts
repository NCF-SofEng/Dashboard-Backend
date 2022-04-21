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
        const credentials = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + Buffer.from(this.client_id + ':' + this.client_secret).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials"
        }).then(res => res.json()).then(data => new SpotifyCredentials(data));

        this.token = credentials.token;
    }

    public getCreep() {
        fetch(this.root + "tracks/70LcF31zb1H0PyJoS1Sx1r", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + this.token
            }
        }).then(res => res.json()).then(data => console.log(data));
    }
}

class SpotifyCredentials {
     private access_token: string;
     private expiry_length: Number;

     constructor(json: any) {
         this.access_token = json.access_token;
         this.expiry_length = json.expiry_length;
     }

     public get token(): string {
         return this.access_token;
     }
}