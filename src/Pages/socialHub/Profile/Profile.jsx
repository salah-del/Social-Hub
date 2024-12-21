import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../../Redux/slices/getUserById";
import ProfileAndCover from "../../../Components/socialHub/Profile/ProfileAndCover";
import UserInfo from "../../../Components/socialHub/Profile/UserInfo";
import Tabs from "../../../Components/socialHub/Profile/Tabs";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const Profile = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const profileIndex = pathSegments.indexOf("profile");
  const id = profileIndex !== -1 ? pathSegments[profileIndex + 1] : null;
  const edit = id === Cookies.get("userID");
  const dispatch = useDispatch();

  const {
    getUser: user,
    status,
    error,
    hasFetched,
  } = useSelector((state) => state.getUser);

  const [loading, setLoading] = useState(false);
  const {
    posts,
    status: postsStatus,
    error: postsError,
  } = useSelector((state) => state.posts);
  // console.log(posts);

  useEffect(() => {
      dispatch(getUserById(id));
  }, [id]);
  // useEffect(() => {
  //     dispatch(getUserById(id));
  //   // const timer = setTimeout(() => setLoading(false), 1000);
  //   // return () => clearTimeout(timer);
  // }, [id]);

  console.log(user);
  return (
    <div className="-m-2">
      <ProfileAndCover
        user={user}
        status={status}
        edit={edit}
      />

      <UserInfo
        user={user}
        status={status}
        posts={posts}
        postsStatus={postsStatus}
        edit={edit}
      />

      <Tabs />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
