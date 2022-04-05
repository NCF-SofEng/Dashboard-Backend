import { Twitter } from "./libs/twitter.js";

new Twitter("AAAAAAAAAAAAAAAAAAAAAO%2BJbAEAAAAAmhg1CzECF%2BqgLtP84vrea2GB1cc%3Dre6yHm0etxHZ0Xv4feDBSrI6VOyESzbtR2KpETS3cL07F3jxD2")
    .getTweets("applebees").then((tweets) => console.log(tweets));