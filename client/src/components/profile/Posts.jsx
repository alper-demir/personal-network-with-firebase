import { usePostsContext } from "../../layouts/ProfileLayout"
import Post from "./Post"

const Posts = () => {
    const { posts } = usePostsContext();

    return (
        <div className="flex flex-wrap gap-1">
            {
                posts.length > 0 ?
                    posts.map(post => (
                        <Post post={post} key={post._id} />
                    )) : <p>No posts available</p>
            }
        </div>
    )
}

export default Posts