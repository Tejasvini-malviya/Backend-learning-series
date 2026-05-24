const express = require('express');
const app = express();
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || token !== 'mytoken123') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized - Invalid or missing token'
        });
    }

    next();
};

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Middleware Learning Series!'
    });
});

app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Dashboard!',
        data: {
            user_name: 'Backend Learner',
            role: 'Admin',
            timestamp: new Date().toISOString()
        }
    });
});

app.get('/test', authMiddleware, (req, res) => {
    res.json({
        message: 'Test endpoint working successfully'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});