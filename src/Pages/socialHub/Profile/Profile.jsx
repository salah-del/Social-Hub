import React, { useState, useEffect, useMemo } from "react";
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

  const pathSegments = useMemo(() => location.pathname.split("/"), [location.pathname]);

  const id = useMemo(() => {
    const profileIndex = pathSegments.indexOf("profile");
    return profileIndex !== -1 ? pathSegments[profileIndex + 1] : null;
  }, [pathSegments]);

  const edit = useMemo(() => id === Cookies.get("userID"), [id]);

  const dispatch = useDispatch();

  const { getUser: user, status } = useSelector((state) => state.getUser);
  const { posts, status: postsStatus } = useSelector((state) => state.posts);


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

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);


  const currentTab = useMemo(() => pathSegments[4] || null, [pathSegments]);


  return (
    <div className="-m-2">
      <ProfileAndCover user={user} status={status} edit={edit} />
      <UserInfo user={user} status={status} posts={posts} postsStatus={postsStatus} edit={edit} />
      <Tabs openTab={currentTab} />
      <Outlet />
    </div>
  );
};

export default Profile;
