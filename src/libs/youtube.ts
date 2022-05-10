import fetch from "node-fetch";
import { Database } from "./database.js";

export class Youtube{
    public async getvideos(db:Database){
        const videos = await fetch(
            "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UC13mSI38YWz5zfvxXDPpePA&part=snippet,id&order=date&maxResults=1000"
            ).then(r => r.json()) as any;
            for (const video of videos.items){
            if (video.snippet.title.includes("red tide" || "Red tide" || "Red Tide")){
                video.id.videoId
                const res = db.collection("youtube-videos").insertOne(video);
            }}
    }
}

