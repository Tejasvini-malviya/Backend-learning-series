require('dotenv').config();
const express = require('express');
const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const API_KEY = process.env.API_KEY;

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Server is running successfully!',
        port: PORT,

        // Check whether variables are loaded
        db_loaded: MONGO_URI ? 'Loaded' : 'Missing',
        jwt_loaded: JWT_SECRET ? 'Loaded' : 'Missing',
        api_key_loaded: API_KEY ? 'Loaded' : 'Missing',

        // Never expose secrets like this
        // jwt_secret: JWT_SECRET
    });
});

// Route to check missing environment variables
app.get('/check-env', (req, res) => {
    const missing = [];

    if (!process.env.MONGO_URI) missing.push('MONGO_URI');
    if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');
    if (!process.env.API_KEY) missing.push('API_KEY');

    if (missing.length > 0) {
        return res.status(500).json({
            error: 'Missing environment variables',
            missing: missing
        });
    }

    res.json({
        status: 'All environment variables are loaded'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('------------------------------');
    console.log('GET /           -> Check env status');
    console.log('GET /check-env  -> Check missing variables');
    console.log('------------------------------');
});