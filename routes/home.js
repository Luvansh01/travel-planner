// routes/home.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');  // Render home.ejs
});

module.exports = router;
