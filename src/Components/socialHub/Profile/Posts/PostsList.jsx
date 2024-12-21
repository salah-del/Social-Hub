import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsUser } from "../../../../Redux/slices/postsReducer";
import PostCard from "./PostCard";

const PostsList = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // dispatch(fetchPostsUser());
  }, [dispatch]);

  if (status === "loading")
    return <p className="text-center text-gray-500">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Posts</h2>
      <div className="flex flex-wrap justify-center">
        {posts.posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
