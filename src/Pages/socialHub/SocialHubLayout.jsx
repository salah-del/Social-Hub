import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getCurrUser } from "../../Redux/slices/userSlice";
import PersistentLayout from "./PersistentLayout";
import { io } from "socket.io-client";
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export const socket = io.connect(SOCKET_URL);
const SocialHubLayout = () => {
  const dispatch = useDispatch();
  const userID = Cookies.get("userID");
  useEffect(() => {
    socket.current = io(SOCKET_URL);
    if (userID) {
      dispatch(getCurrUser(userID));
      // Emit the "add-user" event with the logged-in user's ID
      socket.emit("add-user", userID);
      console.log("User ID sent to server:", userID);
    }
    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id);
    });
    
    socket.current.on("connect_error", (err) => {
      showToast("error", "Socket connection error: " + err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <PersistentLayout>
      <Outlet />
    </PersistentLayout>
  );
};

export default SocialHubLayout;
