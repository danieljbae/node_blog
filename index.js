// Imports
import path from 'path';
import express from 'express';
import expressEdge from 'express-edge';
import mongoose from 'mongoose';

// Init App server
const app = express();

// Add Functionality to app
app.use(express.static('public')); // Register static assets
app.use(expressEdge); // Templating engine functionality
app.set('views', path.join(__dirname, 'views')); // Set location of views

// Set up Database connection to MongoDB
mongoose.connect('mongodb://localhost/node-js-blog');

// Create route handlers with express-edge
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/contact", (req, res) => {
    res.render('contact');
});

app.get("/post", (req, res) => {
    res.render('post');
});

// Start App Server
const port = 4000;
app.listen(port, () => {
    console.log(`App listening on Port ${port}`);
});
