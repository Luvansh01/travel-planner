const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('index'); // Placeholder for now
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
