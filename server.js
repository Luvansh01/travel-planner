const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
let users = [
  { username: "testUser", password: "password123" }
];

app.get('/', (req, res) => {
  res.render('index'); // Placeholder for now
});
app.get('/login', (req, res) => {
  res.render('login'); // Render the login page
});

app.get('/signup', (req, res) => {
  res.render('signup'); // Render the signup page
});

// Handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.redirect('/'); // Redirect to homepage if login is successful
  } else {
    res.send('Invalid credentials, please try again.');
  }
});

// Handle signup
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  // Save user data to users array (this should be replaced with DB logic)
  users.push({ username, password });
  res.redirect('/login'); // After signup, redirect to login
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
