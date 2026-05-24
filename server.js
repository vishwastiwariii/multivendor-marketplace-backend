const express = require('express');
const app = express();
const PORT = 3000;

// Mock database
const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'user' }
];

// Middleware
app.use(express.json());

// 1. GET all users
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

// 2. GET a single user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// 3. POST create a new user
app.post('/api/users', (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    res.status(400).json({ error: 'Name and role are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// 4. GET a protected admin route
app.get('/api/admin', checkAdmin, (req, res) => {
  res.json({ message: 'Welcome to the secret admin dashboard!' });
});

// Admin authorization middleware
function checkAdmin(req, res, next) {
  const userRole = req.headers['x-user-role'];

  if (userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admins only.' });
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});