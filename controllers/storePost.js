import path from 'path';
import Post from '../db/models/Post.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export default (req, res) => {
    try {
        const { image } = req.files;
        const uploadPath = path.resolve(__dirname, '..', 'public', 'posts', image.name);

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
}
