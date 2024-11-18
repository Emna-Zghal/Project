const bookModel = require('../models/book');

//Task 1: Get the book list available in the shop

async function getAllBooks(){
    const bookData = await bookModel.find();
    console.log("hh")
    return(bookData);
}

//Task 2: Get the books based on ISBN 
async function getBookByISBN(isbn){
    const book = await bookModel.findOne({isbn: isbn});

    if (!book) {
        throw new Error('Book not found');
    }
    return(book);
}


//Task 3: Get all books by Author
async function getBookByAuthorName(author){
    const book = await bookModel.find({author: author});
    if (!book) {
        throw new Error('Book not found');
    }
    return(book);
}
async function getBookByTitle(title){
    const book = await bookModel.find({title});
    if (!book) {
        throw new Error('Book not found');
    }
    return(book);
}

async function getBookReview(bookId){
    const book = await bookModel.findById(bookId).select('reviews');
    if (!book) {
        throw new Error('Book not found');
    }
    return book.reviews;
}
module.exports = {
    getAllBooks,
    getBookByISBN,
    getBookByAuthorName,
    getBookByTitle,
    getBookReview
}