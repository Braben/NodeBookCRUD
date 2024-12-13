const BookModel = require("./model");
const AuthorModel = require("./author");

///create book
const createBookcontroller = (req, res) => {
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

const createAuthorcontroller = (req, res) => {
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
  createBookcontroller,
  retrieveBookcontroller,
  updateBookcontroller,
  deleteBookcontroller,
  createAuthorcontroller,
  retrieveAuthorcontroller,
};
