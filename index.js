// Imports
import path from 'path';
import { fileURLToPath } from 'url';  // Import necessary functions
import { dirname } from 'path';
import express from 'express';
import expressEdge from 'express-edge';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Post from './db/models/Post.js';

// Get the current filename and directory using ESM-compatible functions
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Init App server
const app = express();

// Add Functionality to app
app.use(express.static('public')); // Register static assets
app.use(expressEdge); // Templating engine functionality
app.set('views', path.join(__dirname, 'views')); // Set location of views
app.use(bodyParser.json()); // Allows our app to accept JSON from brower (or api client)
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Database connection to MongoDB
mongoose.connect('mongodb://localhost/node-js-blog');

// Create route handlers with express-edge
app.get("/", async (req, res) => {
    const posts = await Post.find({});
    console.log(posts)
    res.render('index', {
        posts
    });
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/contact", (req, res) => {
    res.render('contact');
});

app.get("/post/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post
    });
});

app.get("/post/new", (req, res) => {
    res.render('create');
});

// Post request - save data to Posts model
app.post("/post/store", async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/error-page'); // Redirect to an error page if something goes wrong
    }
});

// Start App Server
const port = 4000;
app.listen(port, () => {
    console.log(`App listening on Port ${port}`);
});
