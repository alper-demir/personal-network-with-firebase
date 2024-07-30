import { BiSolidLike } from "react-icons/bi"
import { FaRegComment } from "react-icons/fa"
import { Link } from "react-router-dom"
import { IoMdVideocam } from "react-icons/io";

const Post = ({ post }) => { // ses olmayan fotoğraf ve videoları göster.
    if (post.contentFileType !== "audio") {
        return (
            <div className="w-[32.9%] max-md:w-full">
                <Link to={`/post/${post._id}`} className="relative group">
                    {
                        post.contentFileType === "video" ? (
                            <div className="relative">
                                <video src={post.contentUrl} className="cursor-pointer group-hover:scale-95 duration-300 object-cover rounded-md group-hover:shadow-md group-hover:shadow-indigo-200 dark:group-hover:shadow-[#777777] group-hover:opacity-90 h-52 w-full max-md:h-full" />
                                <IoMdVideocam className="text-2xl absolute top-1 left-2 text-indigo-700" />
                            </div>
                        ) : (
                            <img src={post.contentUrl} alt={post.title} className="cursor-pointer group-hover:scale-95 duration-300 object-cover rounded-md group-hover:shadow-md group-hover:shadow-indigo-200 dark:group-hover:shadow-[#777777] group-hover:opacity-90 h-52 w-full max-md:h-full" />
                        )
                    }
                    <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold">
                        <div className="flex justify-center items-center flex-col gap-x-2 text-lg">
                            <div className="flex justify-center items-center gap-x-2">
                                {post.likes?.length}
                                <div><BiSolidLike /></div>
                            </div>
                            <div className="flex justify-center items-center gap-x-2">
                                {post.comments?.length}
                                <div><FaRegComment /></div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Post