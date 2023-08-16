import Post from '../db/models/Post.js';

export default async (req, res) => {
    try {
        const posts = await Post.find({});
        res.render('index', {
            posts
        });
    } catch (error) {
        console.error("Error:", error);
        res.redirect('/error-page'); // Redirect to an error page if something goes wrong
    }
}
