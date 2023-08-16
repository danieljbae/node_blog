// Imports
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import expressEdge from 'express-edge';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import Post from './db/models/Post.js';

// Immport controllers (route handlers)
import createPostController from './controllers/createPost.js';
import homePageController from './controllers/homePage.js';
import storePostController from './controllers/storePost.js';
import getPostController from './controllers/getPost.js';

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

// Set up Database connection to MongoDB
mongoose.connect('mongodb://localhost/node-js-blog');

// Set up middleware
import storePost from './middleware/storePost.js';
app.use('/post/store', storePost)

// Set up controllers
app.get("/", homePageController);
app.get("/post/new", createPostController);
app.post("/post/store", storePostController);
app.get("/post/:id", getPostController);

// Start App Server
const port = 4000;
app.listen(port, () => {
    console.log(`App listening on Port ${port}`);
});