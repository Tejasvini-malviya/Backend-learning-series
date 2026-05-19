const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {

    if (req.method === 'POST') {
        console.log('\n>>> HTTP request aayi:');
        console.log(req.body);

        console.log('\n>>> Agar HTTPS hota to:');
        console.log('(HTTPS encrypts data during transmission)');
    }

    next();
});

app.post('/login', (req, res) => {
    res.json({ message: 'ok' });
});

app.listen(3000, () => {
    console.log('Server runs on 3000');
});