import axios from "axios";
import { useState } from "react";
import { FaGhost } from "react-icons/fa";
import { API } from "../../../Api/Api";
import { getCurrUser } from "../../../Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import sweetalert from "../../../Utils/sweetalert";

const GhostMode = ({ user, fetchUserById }) => {
  const dispatch = useDispatch();
  const [isGhost, setisGhost] = useState(user?.isGhost);

  const handelGhostMode = async (action) => {
    const result = await sweetalert.deleteOrNot({
      title: "Notes Ghost Mode",
      text: `Before enabling Ghost Mode, please note: 
       1. **Your Identity Will Be Completely Anonymous - Your identity and activities will remain hidden during Ghost Mode. 
       2. **Delete Your Tracks Before Deactivating - Ensure you delete traces of your actions before turning off Ghost Mode. 
       3. ⚠ **Warning** - Failing to clear your traces may expose your past activities. 
       If you agree to these terms, you may now ${action === "active" ? "enable" : "disable"} Ghost Mode.`,
      confirmBtn: "Agree",
      cancelBtn: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.post(API.ghostMode, { action: action });
        dispatch(getCurrUser(user._id));
        fetchUserById();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return isGhost ? (
    <button onClick={() => handelGhostMode("dis")} title="Ghost Mode">
      <FaGhost size={26} className="text-main-color -mb-1" />
    </button>
  ) : (
    <button onClick={() => handelGhostMode("active")} title="Ghost Mode">
      <FaGhost size={26} className="-mb-1" />
    </button>
  );
};

export default GhostMode;
