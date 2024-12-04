// routes/auth.js
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');  // Render login.ejs
});

router.get('/signup', (req, res) => {
  res.render('signup');  // Render signup.ejs
});

module.exports = router;
