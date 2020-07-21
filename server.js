const express = require("express");

const app = express();

app.use(express.static("public"));

//listen for it on local port 3200 (I am using 3000 for a react project)
app.listen(3200);

//run by runnig node server.js in terminal
