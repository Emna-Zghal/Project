const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); 



//connection with the database 
const connectDB = require('./config/db');
connectDB();


const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes')


// Utilisation des routes

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);


// Lancer le serveur
app.listen(3000);  

