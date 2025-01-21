const express = require("express");
const Router = express.Router();
const { body } = require("express-validator");

const {
  createBookcontroller,
  retrieveBookcontroller,
  updateBookcontroller,
  deleteBookcontroller,
} = require("../controllers/bookControllers");

const valdateCreateBook = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Title is required")
    .isLength({ min: 4, max: 49 })
    .withMessage("Title must be between 4 and 49 characters long."),
  body("author")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Enter a valid author name"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Enter a valid description"),
];

Router.post("/book", valdateCreateBook, createBookcontroller);
Router.get("/book/:_id?", retrieveBookcontroller);
Router.put("/book", updateBookcontroller);
Router.delete("/book", deleteBookcontroller);

module.exports = Router;
