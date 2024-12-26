import axios from "axios";
import { API } from "../../Api/Api";
import { useState } from "react";
import { showToast } from "../../Utils/showToast";

const useProfileVideosHook = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    

    const getUserVideos = async (uId ) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API.getVideosForSpecificUser}/${uId}`);
            setVideos(response.data.videos);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong with fetching videos.");
        } finally {
            setLoading(false);
        }
    };

    const addNewVideo = async (uId, videoDetails) => {
        // Create a temporary ID for the new video
        const tempId = `temp-${Date.now()}`;
        const tempVideo = { ...videoDetails,userId:uId ,_id: tempId, createdAt : Date.now(), views: 0, likes: [],dislikes: [], };

        // Optimistically update the state
        const prevVideos = [...videos];
        
        try {
            // setLoading(true);
            setVideos((prevVideos) => [tempVideo, ...prevVideos]);
            const response = await axios.post(`${API.addVideo}`, videoDetails);
            
            // Replace the temporary video with the response data
            setVideos((prevVideos) =>
                prevVideos.map((video) => (video._id === tempId ? response.data : video))
            );
            showToast('success', "Video added successfully");
        } catch (error) {
            // Revert the state if the API call fails
            // setVideos((prevVideos) => prevVideos.filter((video) => video.id !== tempId));
            setVideos(prevVideos);
            setError(error.response?.data?.message || "Something went wrong with adding the video.");
            showToast('error', error.response?.data?.message || "Something went wrong with adding the video.");
        } finally {
            // setLoading(false);
        }
    };

    const deleteVideo =  (videoId) => { 
        setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId))
    }

    return { videos, loading, error, getUserVideos, addNewVideo, deleteVideo };
};

export default useProfileVideosHook;
