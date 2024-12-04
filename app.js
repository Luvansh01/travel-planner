// Importing required modules
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose'); // Assuming you're using MongoDB for storing users
const User = require('./models/User'); // Your User model
const app = express();

// Set up body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(session({
    secret: 'your_secret_key', // Secret key for encrypting session data
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: { secure: false } // Set to `true` if your app uses HTTPS
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Set up a simple route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Travel Planner App!');
});

// Passport local strategy for authentication
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
        if (user.password !== password) { return done(null, false, { message: 'Incorrect password.' }); }
        return done(null, user);
    });
}));

// Serialize user (store user ID in the session)
passport.serializeUser((user, done) => {
    done(null, user.id); // Store the user ID in the session
});

// Deserialize user (retrieve user from the database using the session ID)
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user); // Retrieve the full user object using the ID stored in the session
    });
});

// Routes for login and registration (you may use forms to send data)
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

// Add a route for the dashboard after successful login
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to your dashboard, ' + req.user.username);
    } else {
        res.redirect('/login');
    }
});

// Route to show login page
app.get('/login', (req, res) => {
    res.render('login'); // Render login.ejs view for the login form
});

// Route to show signup page
app.get('/signup', (req, res) => {
    res.render('signup'); // Render signup.ejs view for the signup form
});

// MongoDB connection (Assuming you're using MongoDB)
mongoose.connect('mongodb://localhost/travel_planner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
