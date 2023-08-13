import mongoose from "mongoose";


// Define Schemas for Post Collection 
const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String
});

// Define a model (table) which app interacts with
const Post = mongoose.model("Post", PostSchema);


// Export post model
export default Post;