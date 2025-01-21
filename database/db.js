const mongoose = require("mongoose");

const BOOKDBCONNECT = async () => {
  await mongoose
    .connect(process.env.BookDB_URI)
    .then((req, res) => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting to the database");
    });
};

module.exports = BOOKDBCONNECT;
