import mongoose from "mongoose";
import Post from "./db/models/Post.js";


mongoose.connect('mongodb://localhost/node-js-test-blog');

/* Testing CRUD operations */


/* CREATE documents */
// const post = new Post({
//     title: "Machine Learning",
//     description: "car data set",
//     content: "data..."
// });
//  Save document 
// await post.save();


/* READ documents */
// const firstArticle = await Post.findOne({});
// console.log(firstArticle);
// const allPosts = await Post.find({});
// console.log(allPosts);
// Filtered Query
// const mlPosts = await Post.find({
//     title: "Machine Learning"
// });
// console.log(mlPosts);
// Query by ID
// const id_post = await Post.findById("64d861727be5f0e3554b4f1a");
// console.log(id_post);


/* UPDATE documents */
// const id_post = await Post.findByIdAndUpdate("64d861727be5f0e3554b4f1a", {
//     description: "Updated description"
// });

/* DELETE documents */
// const id_post = await Post.findByIdAndDelete("64d861727be5f0e3554b4f1a");


// Close db connection
mongoose.connection.close();