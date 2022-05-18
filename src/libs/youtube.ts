import { GridFSBucketReadStreamOptionsWithRevision } from "mongodb";
import fetch from "node-fetch";
import { Database } from "./database.js";

export class Youtube{
    public async getvideos(db:Database){
        let responses: string[] = ["https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UC13mSI38YWz5zfvxXDPpePA&part=snippet,id&order=date&maxResults=1000", 
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UCMYlXK0jyerVnc3dmz-vjCA&part=snippet,id&order=date&maxResults=1000", 
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UCK0UUsCjtMRNtS3BPh1Yc4w&part=snippet,id&order=date&maxResults=1000", 
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UC8SjMQsoy184ZEmFc-PWlpw&part=snippet,id&order=date&maxResults=1000",
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UCdJ9oJ2GUF8Vmb-G63ldGWg&part=snippet,id&order=date&maxResults=1000",
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UCZYTClx2T1of7BRZ86-8fow&part=snippet,id&order=date&maxResults=1000"]
        for (let i = 0; i < 6; i++){
        const videos = await fetch(responses[i]).then(r => r.json()) as any;
            for (const video of videos.items){
            if (video.snippet.title.includes("red tide" || "Red tide" || "Red Tide")){
                video.id.videoId
                const res = db.collection("youtube-videos").insertOne(video);
            }}
        }
    }
}

