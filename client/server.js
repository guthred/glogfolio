// A simple server if you want to run and serve the client independantly.

const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/ping", function(_, res) {
  return res.send("pong");
});
app.get("/*", function(_, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port);
