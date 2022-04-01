const fetch = require("node-fetch");

// An HTTP POST request is an http request that aims to send data to the server instead of asking for it like a GET request does.
// They operate mostly the same, except POST requests contain a body.
function run() {
    // This time, we're calling the fetch function with two parameters instead of just one like we did in the get request.
    // The first parameter is the URL we're requesting, the second is an Object https://www.w3schools.com/js/js_objects.asp,
    // (the JavaScript version of a Java HashMap/Dictionary, which contains key-value pairs).
    fetch("https://www.toptal.com/developers/hastebin/documents", {
        // The first key-value pair declares the method of the request, in this case, POST. The usual options are GET, SET, POST, DELETE, ect..
        method: "POST",
        // The second key here is our body, this is exclusive to POST requests. It contains the data we want to send to the server!
        body: "Hello, World!"
    })
    // Convert the response into a string,
    .then((res) => res.text())
    // Instead of printing it to the console like the GET request, we should do a couple things.
    // For that, we pass in another callback.
    .then((text) => {
        // Print the full response the server sent
        console.log(text);

        // Parse the response into a JavaScript JSON object.
        const json = JSON.parse(text);

        // Get the 'key' value from the JSON object
        const key = json["key"]; // this can also be written as `const key = json.key`
        console.log(`https://www.toptal.com/developers/hastebin/raw/${key}`);
    });
}

run();