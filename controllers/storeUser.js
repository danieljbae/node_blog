import User from '../db/models/User.js';

export default async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error("Error creating user:", error);

        // Check if the error is due to validation errors (example: unique email constraint)
        if (error) {
            return res.redirect('/auth/register'); // Redirect back to the registration page
        }

        res.status(500).send("An error occurred while creating the user");
    }
};