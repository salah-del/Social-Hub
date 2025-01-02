import { memo } from "react"
import PostCard from "../Posts/PostCard"

const SavedPosts = memo(({user, edit}) => {
    console.log(user?.savedPosts);
    
    return (
        user && user.savedPosts && user.savedPosts.length > 0 ? 
        <div className="w-full max-w-4xl mx-auto px-4 py-7">
            <div className="space-y-4">
                {user && user.savedPosts.map((post) => (
                    <PostCard key={post._id} post={post} user={user} edit={edit} />
                ))}
            </div>
        </div>
        :
        <div className="text-center text-gray-500 ">No saved posts.</div>
    )
})

export default SavedPosts