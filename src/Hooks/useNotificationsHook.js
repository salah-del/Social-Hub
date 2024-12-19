import axios from "axios";
import { API } from "../../../Api/Api";

const useNotificationsHook = () => {
  const getNotifications = async ({ userId, setNotifications }) => {
    try {
      const response = await axios.get(`${API.showNotifications}/${userId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return { getNotifications };
};

export default useNotificationsHook;
