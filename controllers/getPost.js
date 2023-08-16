import Post from '../db/models/Post.js';

export default async (req, res) => {
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
}