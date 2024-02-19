const userModel = require("../models/userSchema");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;

        // Validate input
        if (!Name || !Email || !Password) {
            return res.status(400).json({ error: "Name, Email, and Password are required." });
        }

        // Password hashed
        const passwordHash = await argon2.hash(Password);

        const userDetails = await userModel.create({
            Name: Name,
            Email: Email,
            Password: passwordHash,
        });

        const token = jwt.sign({ Email: userDetails.Email, _id: userDetails._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({ user: userDetails, token: token });
    } catch (error) {
        console.error("Error in createUser:", error);
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
};

const login = async (req, res) => {
    try {
        const {Email, Password } = req.body;

        // Validate input
        if (!Email || !Password) {
            return res.status(400).json({ error: "Name and Password are required." });
        }

        const foundUser = await userModel.findOne({ Email: Email });

        if (!foundUser) {
            return res.status(401).json({ error: "Authentication failed. User not found." });
        }

        const isPasswordValid = await argon2.verify(foundUser.Password, Password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Authentication failed. Invalid password." });
        }

        //token generation
        const token = jwt.sign({ Namee: foundUser.Email, _id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token:', token);
        res.header('Authorization', token).json({ message: "Login successful", data: token, email: Email });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { register, login };
