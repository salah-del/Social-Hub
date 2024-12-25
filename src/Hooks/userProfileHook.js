import axios from "axios";
import { API } from "../Api/Api";
import { useState } from "react";
const useProfileHook = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getUserVideos = async ({ uId }) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API.getVideosForSpecificUser}/${uId}`);
            console.log(response.data);
            setVideos(response.data);
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || "Somthing wrong with videos");
        } finally { 
            setLoading(false);
        }
    };
    return {videos, loading, error, getUserVideos}
};

export default useProfileHook;
