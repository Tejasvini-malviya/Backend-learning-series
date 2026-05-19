const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
res.send(`
        <h1>GET vs POST Demo</h1>

        <h2>GET Request</h2>

        <form action="/search" method="GET">
            <input type="text" name="query" placeholder="Search">
            <button type="submit">Search</button>
        </form>

        <hr>

        <h2>POST Request</h2>

        <form action="/order" method="POST">
            <button type="submit">Place Order</button>
        </form>

    `);
});

// GET Route
app.get("/search", (req, res) => {

    res.send(`
        <h2>GET Request</h2>

        <p>Search: ${req.query.query}</p>

        <p>Data visible in URL</p>

        <a href="/">Back</a>
    `);
});

// POST Route
app.post("/order", (req, res) => {

    res.send(`
        <h2>POST Request</h2>

        <p>Order Placed Successfully </p>

        <p>Refresh page to see form resubmission popup</p>

        <a href="/">Back</a>
    `);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});