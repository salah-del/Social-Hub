import axios from "axios";
import { API } from "../../Api/Api";
import { useState } from "react";
import { showToast } from "../../Utils/showToast";

const useSavedItems = () => {
    const [savedItems, setsavedItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSavedItems = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API.getSavedItems);
            setsavedItems(res.data);

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong while getting saved items.");
            showToast("error",error.response?.data?.message || "Something went wrong while getting saved items.");
        } finally {
            setLoading(false);
        }
    };
    

    return { getSavedItems };
};

export default useSavedItems;
