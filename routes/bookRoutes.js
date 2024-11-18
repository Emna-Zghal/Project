const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware ');

const axios = require('axios');

// Mock API URL for books
const API_URL = 'http://localhost:3000/api/books';


//Task 1: Get the book list available in the shop
router.get('/', async(req, res) => {
    try{
        const bookData = await bookController.getAllBooks();
        res.status(200).json(bookData);
    }catch(err){
        res.status(404).json({ error: err.message });
    }
});


//Task 2: Get the books based on ISBN 
router.get('/isbn/:isbn', async (req, res) => {
    try {
        const book = await bookController.getBookByISBN(req.params.isbn);
        console.log("hh")
        res.status(200).json(book);
    }catch(err){
        if (err.message === 'Book not found') {
            return res.status(404).json({ error: err.message });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }}
);

//Task 3: Get all books by Author

router.get('/author/:author', async (req, res) => {
    try{
        const books = await bookController.getBookByAuthorName(req.params.author);
        res.status(200).json(books);

    }catch(err){
        if (err.message === 'Book not found') {
            return res.status(404).json({ error: err.message });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});


//Task 4: Get all books based on Title
router.get('/title/:title', async (req, res) => {
    try{
        const books = await bookController.getBookByTitle(req.params.title);
        res.status(200).json(books);

    }catch(err){
        if (err.message === 'Book not found') {
            return res.status(404).json({ error: err.message });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

//Task 5: Get book Review

router.get('/reviews/:id', async (req, res) =>{

    try{
        const reviews = await bookController.getBookReview(req.params.id);
        res.status(200).json(reviews);
    }catch(err){
        if (err.message === 'Book not found') {
            return res.status(404).json({ error: err.message });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});



//Task 8: Add/Modify a book review

router.post('/reviews/:isbn', authMiddleware, async (req, res) => {
    try {

        const book = await bookController.getBookByISBN(req.params.isbn);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const { comment, rating } = req.body;

        const existingReview = book.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (existingReview) {
   
            existingReview.comment = comment;
            existingReview.rating = rating;
        } else {
 
            book.reviews.push({
                user: req.user._id,
                comment,
                rating,
            });
        }

        console.log(book.reviews);


        await book.save();

        res.status(201).json({ message: 'Review processed successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Task 9: Delete book review added by that particular user

router.delete('/reviews/:isbn', authMiddleware, async (req, res) => {
    try {

        const book = await bookController.getBookByISBN(req.params.isbn);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }


        const reviewIndex = book.reviews.findIndex(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (reviewIndex === -1) {
            return res.status(404).json({ error: 'Review not found for this user.' });
        }


        book.reviews.splice(reviewIndex, 1);


        await book.save();

        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Task 10: Get all books – Using async callback function
router.get('/task10', async (req, res) => {
    try {
        // Fetch all books using Axios
        const response = await axios.get(API_URL);

        // Send the fetched books as the response
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching books:', error.message);

        // Send an error response with appropriate status
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

//Task 11: Search by ISBN – Using Promises
router.get('/task11/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        // Utilisation de Axios avec Promise (Async/Await)
        const response = await axios.get(`${API_URL}/isbn/${isbn}`);
        
        // Si le livre existe, retourner les données
        if (response.data) {
            res.status(200).json(response.data);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book by ISBN:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Task 12: Search by Author 
router.get('/task12/:author', async (req, res) => {
    const author = req.params.author;

    try {
        // Utilisation de Axios avec Promise (Async/Await)
        const response = await axios.get(`${API_URL}/author/${author}`);
        
        // Si le livre existe, retourner les données
        if (response.data) {
            res.status(200).json(response.data);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book by Author:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//Task 13: Search by Title 
router.get('/task13/:title', async (req, res) => {
    const title = req.params.title;

    try {
        // Utilisation de Axios avec Promise (Async/Await)
        const response = await axios.get(`${API_URL}/isbn/${title}`);
        
        // Si le livre existe, retourner les données
        if (response.data) {
            res.status(200).json(response.data);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book by Title:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
