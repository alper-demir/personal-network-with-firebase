import express from "express"
import { register, updateProfileImage, updateProfile, getOneUser, getOneUserById, getAllPostsOfOneUser, likePost, didUserLikeThePost, timeline, checkUsernameValid, changeUsername, changePasswordInProfile } from "../controllers/userController.js"
import { createPost, getOnePost, updatePost, deletePost } from "../controllers/postController.js"
import { createComment, deleteComment, editComment } from "../controllers/postCommentController.js"
const router = express.Router();

router.get("/", (req, res) => {
    return res.send("test")
})

// User Operations
router.post('/register', register);

router.put('/update-profile-image/:userId', updateProfileImage);

router.put('/update-profile/:userId', updateProfile);

router.get("/user-data/:username", getOneUser);

router.get("/userbyid/:id", getOneUserById);

router.get('/posts/:username', getAllPostsOfOneUser);

router.post("/like-post", likePost);

router.post("/check-post-like-status", didUserLikeThePost);

router.get('/timeline/:id/:type', timeline)

router.post('/check-username', checkUsernameValid)

router.put('/change-username', changeUsername);

router.put('/change-password-in-profile', changePasswordInProfile);

// Post Operations
router.post("/create-post", createPost);

router.get('/post/:postId', getOnePost);

router.put('/update-post/:postId', updatePost)

router.delete('/delete-post/:postId', deletePost)


// Post Comment Operations
router.post('/create-comment', createComment)

router.post('/delete-comment/:id', deleteComment)

router.post('/edit-comment/:id', editComment)

export default router;