const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/learnit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Login route
app.post('/login', async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Register route
app.post('/register', async (req, res) => {
  const { name, email, username, password, rememberMe } = req.body;

  if (password.length < 8) {
    return res.status(400).send({ message: 'Password must be at least 8 characters long' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, username, password: hashedPassword, rememberMe });

  try {
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Registration failed', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});