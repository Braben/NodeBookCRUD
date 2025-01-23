const BookModel = require("../models/bookModel");
const { validationResult } = require("express-validator");

///create book
const createBookcontroller = (req, res) => {
  //validate request
  ///---------------------------------//
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  ////---------------------------///

  //get book data from request body
  const { title, author, description } = req.body;
  //create a new book
  const book = new BookModel({
    title,
    author,
    description,
  });
  book.save().then((result) => {
    res.json({ message: "Book created successfully", data: result });
  });
};

//retrieve book
const retrieveBookcontroller = (req, res) => {
  const { _id } = req.params;
  if (_id) {
    ///retrieve a single book
    BookModel.find({ _id })
      .then((book) => {
        res.json({ message: "book retrieved", data: book });
      })
      .catch((err) => console.log(err));
  } else {
    ////retrieve all books
    BookModel.find()
      .then((books) => {
        res.json({ message: "books retrieved", data: books });
      })
      .catch((err) => console.log(err));
  }
};

const updateBookcontroller = (req, res) => {
  const { id, title, author, description } = req.body;
  BookModel.findById(id).then((book) => {
    if (book) {
      book.title = title;
      book.author = author;
      book.description = description;
      book.save().then((result) => {
        res.json({ message: "book updated", data: result });
      });
    }
  });
};

// //delete book
const deleteBookcontroller = (req, res) => {
  const { id } = req.body;
  BookModel.findByIdAndDelete(id)
    .then((result) => {
      res.json({ message: "book deleted", data: result });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createBookcontroller,
  retrieveBookcontroller,
  updateBookcontroller,
  deleteBookcontroller,
};
