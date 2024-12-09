const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// File path for the JSON data
const USERS_FILE = './users.json';

// Helper to read users data
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);    
};

// Helper to write users data
const writeUsers = (data) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
};

// Signup Route
app.post('/signup', (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new Error('All fields are required');
        }

        const users = readUsers();
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = { id: Date.now(), name, email, password };
        users.push(newUser);
        writeUsers(users);

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const users = readUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
