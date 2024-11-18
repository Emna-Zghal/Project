const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = user; 
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
