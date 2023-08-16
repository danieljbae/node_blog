// Imports
import path from 'path';
import { fileURLToPath } from 'url';  // Import necessary functions
import { dirname } from 'path';
import express from 'express';
import expressEdge from 'express-edge';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import Post from './db/models/Post.js';


// Get the current filename and directory using ESM-compatible functions
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Init App server
const app = express();

// Register Middleware Packages 
app.use(fileUpload()); // Adds files to our repsonse object
app.use(express.static('public')); // Location of static assets
app.use(expressEdge); // Templating engine functionality
app.set('views', path.join(__dirname, 'views')); // Set location of views
app.use(bodyParser.json()); // Allows our app to accept JSON from brower (or api client)
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware - Validate form submission
const validateCreatePostMiddleware = (req, res, next) => {
    if (!req.body.username || !req.body.title || !req.body.subtitle || !req.body.content || !req.files || !req.files.image) {
        return res.redirect('/post/new'); // Redirect to the new post creation page
    }
    next();
};
app.use("/post/store", validateCreatePostMiddleware);


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

app.post("/post/store", async (req, res) => {
    try {
        const { image } = req.files;
        const uploadPath = path.resolve(__dirname, 'public', 'posts', image.name);

        image.mv(uploadPath, (error) => {
            if (error) {
                console.error("Error uploading image:", error);
                return res.status(500).send("An error occurred while uploading the image");
            }

            const postData = {
                ...req.body,
                image: `/posts/${image.name}`,
            };

            Post.create(postData)
                .then(() => {
                    res.redirect('/');
                }).catch((postCreateError) => {
                    console.error("Error creating post:", postCreateError);
                    res.status(500).send("An error occurred while creating the post");
                });
        });
    } catch (error) {
        console.error("Error:", error);
        res.redirect('/error-page'); // Redirect to an error page if something goes wrong
    }
});

app.get("/post/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            // Handle the case where no post was found with the given ID
            return res.status(404).send("Post not found");
        }
        res.render('post', {
            post
        });
    } catch (error) {
        // Handle the error appropriately, e.g., sending an error response
        res.status(500).send("An error occurred while fetching the post");
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
