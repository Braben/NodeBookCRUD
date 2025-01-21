const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const bookRoute = require("./routes/bookRoute");
const authorRoute = require("./routes/authorRoute");
const BOOKDBCONNECT = require("./database/db");

//server
server = express();

//middlewares
server.use(bodyParser.json());

//Bookroutes
server.use(bookRoute);
//author routes
server.use(authorRoute);

//db connection
BOOKDBCONNECT();

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
