import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: {
        type : String,
        required: true
    },
    firstName: {
        type: String,
        //required: true,
    },
    lastName: {
        type: String,
        //required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profileUrl: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/test-auth-506a5.appspot.com/o/images%2FdefaultAvatar.jpg?alt=media&token=742ecc01-0a02-48c2-9451-d1a495f22dde"
    },
    about: {
        type: String
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: 0
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PostComment",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("User", UserSchema);
