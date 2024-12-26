import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getUserById } from "../../../Redux/slices/getUserById";
import ProfileAndCover from "../../../Components/socialHub/Profile/ProfileAndCover";
import UserInfo from "../../../Components/socialHub/Profile/UserInfo";
import Tabs from "../../../Components/socialHub/Profile/Tabs";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { API } from "../../../Api/Api";
import { showToast } from "../../../Utils/showToast";

const Profile = () => {
  // const { userData: user, status, fetchUserById } = useUsers();
  const [user, setUser] = useState(null)
  const location = useLocation();

  const pathSegments = useMemo(
    () => location.pathname.split("/"),
    [location.pathname]
  );

  const {id} = useParams()
  
  const edit = useMemo(() => id === Cookies.get("userID"), [id]);
  // const { getUser: user, status } = useSelector((state) => state.getUser);
  const { posts, status: postsStatus } = useSelector((state) => state.posts);

  useEffect(() => {
    const fetchUserById = async () => { 
      try {
        const response = await axios.get(`${API.getUserById}/${id}`);
        setUser(response.data);
      } catch (error) {
        showToast("error", "Error fetching user data");
        console.error("Error fetching user data:", error);
      }
    } 
    fetchUserById();
  }, [id]);

  const currentTab = useMemo(() => pathSegments[4] || null, [pathSegments]);

  return (
    <div className="-m-2">
      <ProfileAndCover user={user} status={status} edit={edit} />
      <UserInfo user={user} status={status} edit={edit} />
      <Tabs openTab={currentTab} />
      <Outlet context={{ user , edit }} />
    </div>
  );
};

export default Profile;
