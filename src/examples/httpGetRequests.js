// For HTTP requests, we're using the 'node-fetch' library.
// It was made to act the same way as the browser based 'fetch' function!
const fetch = require("node-fetch");

/**
 * Executes a basic HTTP GET request to the specified URL. In this case, some weird site to tell you what your IP address is.
 */
function run() {
    // The URL we're requesting to in this situation is api.ipify.org, with a query parameter of format=json.
    // Query parameters are added to the end of the URL, after a '?' character, they just specify a key=value pairs to pass to the server.
    fetch("https://api.ipify.org?format=json")
        // .then in javascript means what happens when the request is successful. Think of it like a bus-stop.
        // Each .then is a new stop, where the passengers can change a bit.
        // res is an Object which contains a bunch of functions. In this case, we call res.text() to get the text content of that website. It turns itself into a string.
        .then(res => res.text())
        // The next stop here, we can do something with the text content. No need to change the value like the last time,
        // All we have to do is just console.log it! 
        .then(text => console.log(text));

    // This type of syntax is called a 'Callback function', https://www.w3schools.com/js/js_callback.asp has some good information on it.
}

// Start the function.
run()