import { useState, useCallback, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../Api/Api";
import { showToast } from "../Utils/showToast";

const NotificationsHook = () => {
  const userId = Cookies.get("userID");

  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);
  const [loadingGeneral, setLoadingGeneral] = useState(false);
  const [loadingNotifications, setloadingNotifications] = useState(false);

  const apiUrls = useMemo(
    () => ({
      fetchNotifications: `${API.getNotifications10By10}/${userId}`,
      fetchUnreadNotifications: `${API.getNotificationsNotReaded}/${userId}`,
      markAllAsRead: `${API.markIsReadNotifications}/${userId}`,
    }),
    [userId]
  );

  const fetchData = async (url, setState, setLoading) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setState(response.data);
    } catch (error) {
      console.error(`Error fetching`, error);
      showToast("Error", error.response?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = useCallback(() => {
    fetchData(
      apiUrls.fetchNotifications,
      setNotifications,
      setloadingNotifications
    );
  }, [apiUrls]);

  const fetchUnreadNotifications = useCallback(() => {
    fetchData(
      apiUrls.fetchUnreadNotifications,
      setUnreadNotifications,
      setLoadingGeneral
    );
  }, [apiUrls]);

  const markAllAsRead = useCallback(async () => {
    await fetchData(
      apiUrls.markAllAsRead,
      setReadNotifications,
      setLoadingGeneral
    );
  }, [apiUrls]);

  return {
    notifications,
    unreadNotifications,
    loadingGeneral,
    loadingNotifications,
    fetchNotifications,
    fetchUnreadNotifications,
    markAllAsRead,
  };
};

export default NotificationsHook;
