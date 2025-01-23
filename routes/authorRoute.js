const express = require("express");
const AuthorModel = require("../models/authorModel");
const Router = express.Router();
const { body } = require("express-validator");

const {
  createAuthorcontroller,
  retrieveAuthorcontroller,
} = require("../controllers/authorController");

const validateCreateAuthor = [
  body("name").trim().not().isEmpty().withMessage("Enter a valide author name"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email field is empty")
    .isEmail()
    .withMessage("Enter a valid email")
    .custom((value) => {
      return AuthorModel.findOne({ email: value }).then((author) => {
        if (author) {
          return Promise.reject("Email already exists");
        }
      });
    }),
  body("country").trim().not().isEmpty().withMessage("Country is required"),
];

Router.post("/author", validateCreateAuthor, createAuthorcontroller);
Router.get("/author/:_id?", retrieveAuthorcontroller);

module.exports = Router;
// Compare this snippet from NodeBookCRUD-week8/routes/authorRoute.js:
