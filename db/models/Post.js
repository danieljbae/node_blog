import mongoose from "mongoose";


// Define Schemas for Post Collection 
const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    username: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    },

})
// Define a model (table) which app interacts with
const Post = mongoose.model("Post", PostSchema);

// Export post model
export default Post;