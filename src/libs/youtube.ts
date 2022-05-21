import { GridFSBucketReadStreamOptionsWithRevision } from "mongodb";
import fetch from "node-fetch";
import { Database } from "./database.js";
/*
* @author D.R.
* The purpose of this class is to contain the getVideos function, whose main purpose is to pull videos into the MongoDB Database
* using API calls if they are red tide related.
*/
export class Youtube{
    /* @param db: The database we're using in mongoDB
    * @return returns video id info to the mongoDB database.
    */
    //Intakes the imported MongoDB database as a parameter
    public async getvideos(db:Database){
        //every time this function is executed, the links are immedietally triggered and their responses are logged into the string array.
        let responses: string[] = ["https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UC13mSI38YWz5zfvxXDPpePA&part=snippet,id&order=date&maxResults=1000", 
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UCMYlXK0jyerVnc3dmz-vjCA&part=snippet,id&order=date&maxResults=1000", 
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UCK0UUsCjtMRNtS3BPh1Yc4w&part=snippet,id&order=date&maxResults=1000", 
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UC8SjMQsoy184ZEmFc-PWlpw&part=snippet,id&order=date&maxResults=1000",
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UCdJ9oJ2GUF8Vmb-G63ldGWg&part=snippet,id&order=date&maxResults=1000",
        "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB2U-K-C92Yjw1N1rLzbE-viv-s3YgRgwM&channelId=UCZYTClx2T1of7BRZ86-8fow&part=snippet,id&order=date&maxResults=1000"]
        //loops through all the channel data responses.
        for (let i = 0; i < 6; i++){
            //defines videos as the Json response in the string array.
        const videos = await fetch(responses[i]).then(r => r.json()) as any;
        //for every video in the JSon response, any video with Red Tide in the title is inserted into the database.
            for (const video of videos.items){ 
            if (video.snippet.title.includes("red tide" || "Red tide" || "Red Tide")){
                video.id.videoId
                const res = db.collection("youtube-videos").insertOne(video);
            }}
        }
    }
}

