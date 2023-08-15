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

app.get("/post/:id", async (req, res) => {
    try {
        console.log("TESTING HELLO WORLD");
        const post = await Post.findById(req.params.id);
        if (!post) {
            // Handle the case where no post was found with the given ID
            console.log("Unable to find post by ID!!!!!!!!");
            return res.status(404).send("Post not found");
        }
        res.render('post', {
            post
        });
        console.log("Loaded in standard post ");
    } catch (error) {
        // Handle the error appropriately, e.g., sending an error response
        res.status(500).send("An error occurred while fetching the post");
        console.log("CATCH ERROR", error);
    }
});


app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/contact", (req, res) => {
    res.render('contact');
});

// Start App Server
const port = 4000;
app.listen(port, () => {
    console.log(`App listening on Port ${port}`);
});
