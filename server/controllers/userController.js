import User from "../models/User.js"
import Post from "../models/Post.js"

export const register = async (req, res) => {
    const { firstName, lastName, username, email, _id } = req.body;
    try {

        const usernameExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });

        if (usernameExists) {
            return res.json({ message: "This username is already taken by other user", status: "error" });
        }
        if (emailExists) {
            return res.json({ message: "This email is used by other user", status: "error" });
        }

        const newUser = await User.create({ firstName, lastName, username, email, _id });
        if (newUser) {
            return res.json({ newUser, message: "User created" }).status(201);
        }
        return res.json({ message: "User create error" }).status(404);
    }
    catch (error) {
        console.log("User create error: " + error);
    }
}

export const updateProfileImage = async (req, res) => {
    const { userId } = req.params;
    const { imageUrl } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { profileUrl: imageUrl });
        if (updatedUser && user.profileUrl) {
            return res.json({ message: "Profile picture updated.", status: "success" }).status(200);
        } else {
            return res.json({ message: "Profile picture update failed." }).status(400);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const updateFields = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (updatedUser) {
            return res.json({ message: "Profile updated successfully.", status: "success" });
        } else {
            return res.status(404).json({ message: "User not found.", status: "error" });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: "An error occurred while updating profile.", status: "error" });
    }
}

export const getOneUser = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ username }, { about: 1, firstName: 1, lastName: 1, posts: 1, username: 1, profileUrl: 1 });
        if (user) {
            return res.json(user);
        }
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        console.log("User find error: " + error);
        return res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
}

export const getOneUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id, { username: 1, firstName: 1, lastName: 1, profileUrl: 1 });
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

export const getAllPostsOfOneUser = async (req, res) => {
    const username = req.params.username;
    try {
        const posts = await User.findOne({ username }).populate({
            path: 'posts',
            options: { sort: { createdAt: -1 } } // Sorting posts by 'createdAt' field in descending order
        }).select('posts');

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', status: 'error' });
    }
}


export const timeline = async (req, res) => {
    const { id, type } = req.params;
    try {
        if (type === "posts") {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found", status: "error" });
            }

            // Find posts of the users that the current user is following
            const timelinePosts = await Post.find({ userId: { $in: user.followings } })
                .populate("userId", "firstName lastName username profileUrl")
                .sort({ createdAt: -1 });

            return res.json({ timeline: timelinePosts, status: "success" });
        }

        if (type === "notices") {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found", status: "error" });
            }

            // Find notices of the users that the current user is following
            const timelineNotices = await LostPet.find({ userId: { $in: user.followings } })
                .populate("userId", "firstName lastName username profileUrl")
                .sort({ createdAt: -1 });

            return res.json({ timeline: timelineNotices, status: "success" });
        }

    } catch (error) {
        console.error("Error fetching timeline:", error);
        return res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
}

export const likePost = async (req, res) => {
    const { userId, postId } = req.body;
    try {
        const user = await User.findOne({ _id: userId });
        const post = await Post.findById(postId);

        if (!user.likes.includes(postId)) {
            await post.updateOne({ $push: { likes: userId } });
            await user.updateOne({ $push: { likes: postId } });
            return res.json({ message: "New like pushed!", liked: true });

        } else {
            await post.updateOne({ $pull: { likes: userId } });
            await user.updateOne({ $pull: { likes: postId } });
            return res.json({ message: "Like pulled!", liked: false });
        }


    } catch (error) {
        console.log("Create like error: " + error);
        res.status(500).json({ message: "New like create error" });
    }
}

export const didUserLikeThePost = async (req, res) => { // On the post detail page like status will be checked
    const { userId, postId } = req.body;
    try {
        // Check if the user has an entry containing the postId in the likes field
        const user = await User.findOne({ _id: userId });
        const liked = user.likes.includes(postId);

        return res.json({ liked });
    } catch (error) {
        console.error("Check post like status error:", error);
        return res.status(500).json({ message: 'Internal Server Error', status: "error" });
    }
}

export const checkUsernameValid = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ message: "Username is avaliable.", status: "success", avaliable: true });
        }
        return res.json({ message: "Username is not avaliable!", status: "success", avaliable: false });
    } catch (error) {
        return res.json({ message: "Error username", status: "error" });
    }

}

export const changeUsername = async (req, res) => {
    const { userId, newUsername, data } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', status: "error" });
        }

        user.username = newUsername;
        await user.save();

        const newToken = generateToken(data);

        return res.status(200).json({ message: 'Username successfully changed', status: "success", token: newToken });
    } catch (error) {
        console.error('Error changing username:', error);
        return res.status(500).json({ message: 'Server error', status: "error" });
    }
}

export const changePasswordInProfile = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', status: "error" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.json({ message: 'Incorrect old password', status: "error" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({ message: 'Password successfully changed', status: "success" });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Server error' });
    }
}