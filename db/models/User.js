import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

// Use Mongoose Model Hook pre('save'), where 'save' is next function
UserSchema.pre('save', function (next) {
    // 'this' is current instance of User schema
    const user = this
    // Hash user password before next() 
    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted
        next()
    })
})


// Define a model (table) which app interacts with
const User = mongoose.model("User", UserSchema);

// Export User model
export default User;


