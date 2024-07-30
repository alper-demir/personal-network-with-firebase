const Post = ({ post, user }) => {
    return (
        <div className="flex flex-col gap-y-1 mt-4 border-b pb-2 border-rose-600">
            <div>
                <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-x-1 items-center">
                        <div>
                            <img src={user.imageUrl} alt="" className="rounded-full object-cover w-12 h-12" />
                        </div>
                        <div>
                            <span className="font-medium">@{post.username} </span>
                        </div>
                    </div>
                    <div>
                        <span className="cursor-pointer" title={new Date().toLocaleString()}>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <img src={post.contentUrl} alt="" className="rounded-md object-cover" />
                </div>
                <div className="mt-1 text-sm">
                    <div className="text-justify">
                        <span className="font-medium">@{post.username}: </span>
                        <span>{post.content}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;