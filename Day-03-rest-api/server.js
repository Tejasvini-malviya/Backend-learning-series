const express = require('express');
const app = express();
app.use(express.json());


// Dummy users data
let users = [
    {
        id: 1,
        name: 'Rahul',
        role: 'Developer'
    },
    {
        id: 2,
        name: 'Priya',
        role: 'Designer'
    }
];


// GET /users → Get all users
app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });

});


// GET /users/:id → Get single user
app.get('/users/:id', (req, res) => {
    const user = users.find(
        u => u.id === Number(req.params.id)
    );
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    res.status(200).json({
        success: true,
        data: user
    });

});


// POST /users → Create new user
app.post('/users', (req, res) => {
    const { name, role } = req.body;
    if (!name || !role) {
        return res.status(400).json({
            success: false,
            message: 'Name and role are required'
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        role
    };

    users.push(newUser);
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
    });

});


// PUT /users/:id → Update user
app.put('/users/:id', (req, res) => {
    const index = users.findIndex(
        u => u.id === Number(req.params.id)
    );
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    users[index] = {
        ...users[index],
        ...req.body
    };
    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: users[index]
    });

});


// DELETE /users/:id → Delete user
app.delete('/users/:id', (req, res) => {

    const userExists = users.some(
        u => u.id === Number(req.params.id)
    );

    if (!userExists) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    users = users.filter(
        u => u.id !== Number(req.params.id)
    );

    // 204 = No Content
    res.status(204).send();

});


// Start server
app.listen(3000, () => {

    console.log('🚀 Server running at http://localhost:3000');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

    console.log('GET    /users      → Get all users');

    console.log('GET    /users/:id  → Get single user');

    console.log('POST   /users      → Create new user');

    console.log('PUT    /users/:id  → Update user');

    console.log('DELETE /users/:id  → Delete user');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

});