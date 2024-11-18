const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // Pour la gestion des JWT

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

// Hacher le mot de passe avant de l'enregistrer
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Méthode pour générer un token JWT
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ id: this._id }, 'your_jwt_secret', { expiresIn: '1h' });
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
