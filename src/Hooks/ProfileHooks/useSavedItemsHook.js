import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../Api/Api";
import { saveVideo } from "../../Redux/slices/userSlice";
import { showToast } from "../../Utils/showToast";

const useSavedItems = () => {
    const [videos, setVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    
    const getSavedVideos = async () => {
        try {
            setVideosLoading(true)
            const res = await axios.get(API.getSavedVideos);
            console.log(res.data);
            
            setVideos(res.data.savedVideos);
        } catch (error) {
            console.error('Error fetching videos:', error);
            setVideosLoading(false)
        } finally { 
            setVideosLoading(false)
        }
    };

    const handleSaveVideo = async (video) => {
        try {
            const response = await axios.post(`${API.saveVideo}/${video._id}`);
            console.log(response.data);
            showToast('success', "Video saved successfully");
            dispatch(saveVideo(video));
        } catch (error) {
            showToast("error", error?.response?.data?.message || "Failed to save video");
        }
    }
    const handleUnsaveVideo = async(comingVideo) => { 
        const oldSavedVideos = videos ;
        setVideos(videos.filter((video) => video._id !== comingVideo._id));
        try {
            await axios.post(`${API.unSaveVideo}/${comingVideo._id}`);
            showToast('success', "Video unsaved successfully")
        } catch (error) {
            showToast('error', error?.response?.data?.message || "Video wasn't unsaved");
            setVideos(oldSavedVideos);
        }
    }
    
    return { videos,videosLoading, handleSaveVideo,handleUnsaveVideo, getSavedVideos };
};

export default useSavedItems;
