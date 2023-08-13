import mongoose from "mongoose";
import Post from "./db/models/Post.js";


mongoose.connect('mongodb://localhost/node-js-test-blog');

// Create document 
const article = new Post({
    title: "My first title",
    description: "My first title",
    content: "My first title"
});

//  Save document 
await article.save();

// Query document 
const firstArticle = await Post.findOne({});
console.log(firstArticle);

// Close db connection
mongoose.connection.close();