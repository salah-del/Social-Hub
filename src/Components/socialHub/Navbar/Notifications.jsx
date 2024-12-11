import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
import { API } from "../../../Api/Api";
import Cookies from "js-cookie";
import { formatDate } from "../../../Utils/formatDate";
const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const [notifications, setNotifications] = useState([]);
  const userId = Cookies.get("userID");

  const getNotifications = async () => {
    try {
      const response = await axios.get(`${API.showNotifications}/${userId}`);
      setNotifications(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotifications();

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Bell Icon with Notification Count */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-gray-800 relative mt-1.5"
      >
        <FaBell size={20} />
        <span className="absolute -top-1 -right-1 bg-main-color text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {notifications.length}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute -right-3.5 mt-2 w-72 bg-c-bg1 rounded shadow-lg  z-50">
          {/* Arrow pointing to the button */}
          <div className="absolute -top-1.5 right-4 w-4 h-4 bg-c-bg1 rotate-45 z-40"></div>
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start  border-b border-gray-700 px-4 py-2 hover:bg-gray-700"
              >
                <div className="">
                  <p className="text-base  text-white font-medium">
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;