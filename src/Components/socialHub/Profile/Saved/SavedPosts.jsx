import { memo } from "react"
import Post from "../Posts/PostCard"

const SavedPosts = memo(({user, edit}) => {
    console.log(user?.savedPosts);
    
    return (
        <div>
            {user && user.savedPosts.map((post) => (
                <div key={post._id}>
                    <Post post={post} user={user} edit={edit} />
                </div>
            ))}
        </div>
    )
})

export default SavedPosts