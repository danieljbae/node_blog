import User from '../db/models/User.js';

export default async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("An error occurred while creating the user");
    }
};