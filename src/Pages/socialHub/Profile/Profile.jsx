import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProfileAndCover from "../../../Components/socialHub/Profile/ProfileAndCover";
import UserInfo from "../../../Components/socialHub/Profile/UserInfo";
import Tabs from "../../../Components/socialHub/Profile/Tabs";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useUsers } from "../../../Hooks/useUsers";
const Profile = () => {
  const { userData: user, status, fetchUserById } = useUsers();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const profileIndex = pathSegments.indexOf("profile");
  const id = profileIndex !== -1 ? pathSegments[profileIndex + 1] : null;
  const edit = id === Cookies.get("userID");

  const {
    posts,
    status: postsStatus,
    error: postsError,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  return (
    <div className="-m-2">
      <ProfileAndCover user={user} status={status} edit={edit} />

      <UserInfo
        user={user}
        status={status}
        posts={posts}
        postsStatus={postsStatus}
        edit={edit}
      />

      <Tabs openTab={pathSegments[4] ? pathSegments[4] : null} />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
