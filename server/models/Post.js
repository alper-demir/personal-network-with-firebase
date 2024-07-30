import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    contentUrl: {
        type: String,
        required: true,
    },
    contentFileType: {
        type: String,
        enum: ["image", "video", "audio"],
    },
    likes: [
        {
            type: String,
            ref: "User",
            default: 0
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PostComment",
            default: 0
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Post", PostSchema);
