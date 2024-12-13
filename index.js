const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {
  createBookcontroller,
  retrieveBookcontroller,
  // updateBookcontroller,
  //deleteBookcontroller,
} = require("./controller");

//server
server = express();

const port = 5000;

//middlewares
server.use(bodyParser.json());

//routes
server.post("/book", createBookcontroller);
server.get("/book/:_id?", retrieveBookcontroller);
//server.put("/book", updateBookcontroller);
//.delete("/book", deleteBookcontroller);

//db connection
mongoose
  .connect(
    "mongodb+srv://kbenlamptey:xDwXzuJSO4nzihPS@cluster0.my5r1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    server.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
