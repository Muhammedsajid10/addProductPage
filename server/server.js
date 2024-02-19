const express = require('express');
const app = express();
const connection = require('./mongoDb/mongoose');
const router = require('./router/Router');
const dotenv = require('dotenv');
const cors = require('cors');
const { translate } = require('@vitalets/google-translate-api');


// Load environment variables from a .env file
dotenv.config();
app.use(cors());

// MongoDB connection
connection();




// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route for translating text
// app.post('/translate', async (req, res) => {
//     const { text, to } = req.body;
//     try {
//         const translation = await translate(text, { to });
//         res.json({ translatedText: translation.text });
//     } catch (error) {
//         console.error('Error translating text:', error);
//         res.status(500).json({ error: 'Failed to translate text' });
//     }
// });

// Router middleware
app.use('/', router);

app.use((req, res, next) => {
    res.status(404).json('Page not found');
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
