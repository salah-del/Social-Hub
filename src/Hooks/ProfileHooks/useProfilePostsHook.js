import axios from "axios";
import { API } from "../../Api/Api";
import { useState } from "react";
import { showToast } from "../../Utils/showToast";

const useProfilePostsHook = () => {
  const [posts, setPosts] = useState([]);
  const [isAddNewPostModalOpen, setIsAddNewPostModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addPostLoading, setAddPostLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddNewPostModal = () => {
    setIsAddNewPostModalOpen((prev) => !prev);
  };

  const getUserPosts = async (uId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API.getPostsUser}/${uId}`);
      setPosts(response.data.posts);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong with fetching videos."
      );
    } finally {
      setLoading(false);
    }
  };

  const addNewPost = async (uId, postDetails) => {

    try {
      setAddVideoLoading(true);
      setVideos((prevVideos) => [tempVideo, ...prevVideos]);
      const response = await axios.post(`${API.addVideo}`, videoDetails);
      console.log(response.data);

      // Replace the temporary video with the response data
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === tempId ? response.data : video
        )
      );
      showToast("success", "Video added successfully");
      handleAddNewVideoModal();
    } catch (error) {
      setVideos(prevVideos);
      setError(
        error.response?.data?.message ||
          "Something went wrong with adding the video."
      );
      showToast(
        "error",
        error.response?.data?.message ||
          "Something went wrong with adding the video."
      );
    } finally {
      setAddVideoLoading(false);
    }
  };

  const deleteVideo = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video._id !== videoId)
    );
  };

  return {
    videos,
    loading,
    addVideoLoading,
    error,
    getUserVideos,
    addNewVideo,
    deleteVideo,
    handleAddNewVideoModal,
    isAddNewVideoModalOpen,
  };
};

export default useProfilePostsHook;
