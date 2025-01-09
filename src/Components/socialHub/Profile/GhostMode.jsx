import axios from "axios";
import { useState } from "react";
import { FaGhost } from "react-icons/fa";
import { API } from "../../../Api/Api";
import { getCurrUser } from "../../../Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const GhostMode = ({ user, fetchUserById }) => {
  const dispatch = useDispatch();
  const [isGhost, setisGhost] = useState(user?.isGhost);

  const handleGhostMode = async (action) => {
    const result = await Swal.fire({
      title: "Notes Ghost Mode",
      html: `
        <div style="max-height: 200px; overflow-y: auto; padding: 10px; border: 1px solid #ddd; border-radius: 8px; text-align: left; font-size: 14px;">
          <p style="color: #4a90e2; font-weight: bold;">Before enabling Ghost Mode, please note:</p>
          <ol style="padding-left: 20px;">
            <li style="margin-bottom: 10px;">
              <strong style="color: #e74c3c;">Your Identity Will Be Completely Anonymous</strong> - 
              <span style="color: #34495e;">Your identity and activities will remain hidden during Ghost Mode.</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="color: #f39c12;">Delete Your Tracks Before Deactivating</strong> - 
              <span style="color: #34495e;">Ensure you delete traces of your actions before turning off Ghost Mode.</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="color: #c0392b;">⚠ Warning</strong> - 
              <span style="color: #34495e;">Failing to clear your traces may expose your past activities.</span>
            </li>
          </ol>
          <p style="color: #2ecc71; font-weight: bold;">
            If you agree to these terms, you may now ${action === "active" ? "enable" : "disable"} Ghost Mode.
          </p>
        </div>`,
      showCancelButton: true,
      confirmButtonText: "Agree",
      confirmButtonColor: "#4a90e2",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#95a5a6",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.post(API.ghostMode, { action: action });
        dispatch(getCurrUser(user._id));
        fetchUserById();
        setisGhost(action === "active");
      } catch (error) {
        if (error.response?.status === 403) {
          // Handle the 403 error and show the backend message
          Swal.fire({
            title: "Action Forbidden",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#e74c3c",
          });
        } else {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "An unexpected error occurred. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#e74c3c",
          });
        }
      }
    }
  };
  

  return (
    <div className="ghost-mode-container flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <button
        onClick={() => handleGhostMode(isGhost ? "dis" : "active")}
        title={isGhost ? "Disable Ghost Mode" : "Enable Ghost Mode"}
        className={`ghost-mode-button flex items-center justify-center p-3 rounded-full transition-transform duration-300 ${
          isGhost
            ? "bg-main-color text-white border-2 border-main-color hover:scale-110"
            : "bg-white text-gray-600 border-2 border-gray-400 hover:border-main-color hover:text-main-color hover:scale-110"
        } shadow-md hover:shadow-lg`}
      >
        <FaGhost size={36} className={`${isGhost ? "animate-bounce" : ""}`} />
      </button>
      <span
        className={`mt-4 text-lg font-semibold ${
          isGhost ? "text-main-color" : "text-gray-600"
        }`}
      >
        {isGhost ? "Ghost Mode Enabled" : "Ghost Mode Disabled"}
      </span>
    </div>
  );
};

export default GhostMode;
