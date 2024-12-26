import axios from "axios";
import { API } from "../../Api/Api";
import { useState } from "react";
import { showToast } from "../../Utils/showToast";

const useSavedItems = () => {
    const [savedItems, setsavedItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    

    const getSavedItems = async (videoIds, postIds) => {
        try {
            setLoading(true);

            // Fetch all videos by their IDs
            const videoRequests = videoIds.map((id) => 
                axios.get(`${API.getVideo}/${id}`)
            );

            // Resolve all requests
            const videoResponses = await Promise.all(videoRequests);

            // Extract the data from each response
            const videos = videoResponses.map((response) => response.data);

            console.log("Fetched Videos:", videos);

            // You can also fetch posts similarly if needed:
            // const postRequests = postIds.map((id) =>
            //     axios.get(`${API.getPost}/${id}`)
            // );
            // const postResponses = await Promise.all(postRequests);
            // const posts = postResponses.map((response) => response.data);

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong while getting saved items.");
        } finally {
            setLoading(false);
        }
    };
    

    return { };
};

export default useSavedItems;
