// Const: Constant Variable Declaration, the alternative is 'let' if the variable is going to change.
// Require: Imports another file or module into this project.
// This imports everything inside the "express" library into the constant variable 'express'
const express = require("express");

// This creates the new http / api server for the project.
const server = express();

// This listens for any HTTP request to the path "/". This is the root path.
// the 'req' variable is the request variable, the res variable is the response.
// req: https://expressjs.com/en/4x/api.html#req
// res: https://expressjs.com/en/4x/api.html#res
// http://localhost:8080/
server.get("/", (req, res) => {
    // This sends the response string "Hello, World!" to the connected client.
    res.send("Hit the / endpoint!")
})

// Similar to above, this just sends a simple response to the client. Except this is accessed by http://localhost:8080/ping 
server.get("/ping", (req, res) => {
    res.send("Pong!")
})

// This starts the web server listening on port 8080, then prints a message when it starts!
server.listen(8080, () => {
    console.log("Started listening no port 8080!\n\t| http://localhost:8080/")
})