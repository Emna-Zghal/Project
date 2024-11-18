// config/db.js

const mongoose = require('mongoose');

// Fonction pour se connecter à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/courseraProject', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connecté avec succès');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err.message);
    process.exit(1); // Arrêter l'application si la connexion échoue
  }
};

// Exporter la fonction connectDB pour l'utiliser dans d'autres fichiers
module.exports = connectDB;
