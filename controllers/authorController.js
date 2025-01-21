const AuthorModel = require("../models/authorModel");
const { validationResult } = require("express-validator");

const createAuthorcontroller = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const { name, email, country, bookId } = req.body;
  const author = new AuthorModel({
    name,
    email,
    country,
    bookId,
  });
  author
    .save()
    .then((result) => {
      if (result) {
        res.json({ message: "Author created successfully", data: result });
      } else {
        res.json({ message: "Author creation failed", data: result });
      }
    })
    .catch((err) => console.log(err));
};

const retrieveAuthorcontroller = (req, res) => {
  const { _id } = req.params;
  if (_id) {
    ///retrieve a single book
    AuthorModel.find({ _id })
      //  ///populate the bookId field with the book details
      .populate("bookId")
      .then((author) => {
        ///sort the books by title in ascending order
        res.json({ message: "author retrieved", data: author });
      })
      .catch((err) => console.log(err));
  } else {
    ////retrieve all books
    AuthorModel.find()
      ///populate the bookId field with the book details
      .populate("bookId", "title description -_id")
      ///sort the books by title in ascending order
      .then((authors) => {
        res.json({ message: "authors retrieved", data: authors });
      })
      .catch((err) => console.log(err));
  }
};

//export controllers
module.exports = {
  createAuthorcontroller,
  retrieveAuthorcontroller,
};
