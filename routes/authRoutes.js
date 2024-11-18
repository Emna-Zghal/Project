const express = require('express');
const router = express.Router();
const userModel = require('../models/user')

const bookController = require('../controllers/bookController');


//Task 6: Register New user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'This user already exists' });
        }
        const newUser = new userModel({
            name,
            email,
            password
        });

        await newUser.save();
        const token = newUser.generateAuthToken();
        res.status(201).json({
            message: 'User registered successfully',
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while registering user' });
    }
});

//Task 7: Login as a Registered user

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = user.generateAuthToken();

        res.json({
            message: 'Connection successful',
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while connecting' });
    }
});






module.exports = router;