const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env file

// Middleware
app.use(express.static(path.join(__dirname, 'public')));  // Static file handling
app.set('view engine', 'ejs');  // Set EJS as the templating engine

// Define routes
app.get('/', (req, res) => {
  res.render('index');  // Render index.ejs from views folder
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
