const express = require("express");
const app = express();
app.use(express.json());

// 200 OK
app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users fetched successfully"
  });
});

// 201 Created
app.post("/users", (req, res) => {
  res.status(201).json({
    message: "User created successfully"
  });
});

// 400 Bad Request
app.get("/bad-request", (req, res) => {
  res.status(400).json({
    message: "Invalid request"
  });
});

// 401 Unauthorized
app.get("/unauthorized", (req, res) => {
  res.status(401).json({
    message: "Token missing or invalid"
  });
});

// 403 Forbidden
app.get("/forbidden", (req, res) => {
  res.status(403).json({
    message: "Access denied"
  });
});

// 404 Not Found
app.get("/users/:id", (req, res) => {
  res.status(404).json({
    message: "User not found"
  });
});

// 500 Internal Server Error
app.get("/error", (req, res) => {
  throw new Error("Something went wrong");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});