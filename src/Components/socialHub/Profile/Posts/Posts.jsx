import { useEffect, useState } from "react";
import PostCard from "../Posts/PostCard";
import { usePosts } from "../../../../Hooks/usePosts";
import { useOutletContext } from "react-router-dom";
import Loader from "../../../../Utils/Loader";
import AddNewPostModal from "./AddNewPostModal";
import Modal from "../../../../Utils/Modal";
function Posts() {
  const { user, edit, loading } = useOutletContext();
  const { fetchUserPosts, posts, status, error, resetPosts } = usePosts();
  const [isAddNewPostModalOpen, setIsAddNewPostModalOpen] = useState(false);
  
  const handlefetchUserPosts = async (id) => {
    resetPosts();
    await fetchUserPosts(id);
  };

  useEffect(() => {
    if (user && user._id) {
      handlefetchUserPosts(user._id);
    }
  }, [user, fetchUserPosts]);

  if (status === "loading" || status === "idle" || !user || loading) {
    return (
      <div className={`w-full flex items-center justify-center mt-32`}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-6 ">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 ">
            {edit ? "Your posts" : "Posts"}
          </h2>
          {posts && posts.length > 0 && edit && (
            <button
              onClick={() => setIsAddNewPostModalOpen(true)}
              className="ml-auto text-xs bg-main-color px-3 py-2 text-white trans hover:bg-sec-color rounded-md "
            >
              Add New Post
            </button>
          )}
        </div>
        {posts && posts.length <= 0 && (
          <div className="w-full mt-16 text-center flex items-center flex-col gap-3">
            <h1 className="  text-gray-500 text-2xl font-semibold">
              {edit
                ? "There are no posts yet, share something special today!"
                : "There are currently no posts on this account."}
            </h1>
            {edit && (
              <button
                onClick={() => setIsAddNewPostModalOpen(true)}
                className="text-xs bg-main-color px-3 py-2 text-white trans hover:bg-sec-color rounded-md "
              >
                Add New Post
              </button>
            )}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-7">
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              user={user}
              edit={edit}
              openComments={true}
            />
          ))}
        </div>
      </div>

      {isAddNewPostModalOpen && (
        <Modal
          title={"Add New Post"}
          onClose={() => setIsAddNewPostModalOpen(false)}
        >
          <AddNewPostModal setCloseModal={setIsAddNewPostModalOpen} />
        </Modal>
      )}
    </>
  );
}

export default Posts;
