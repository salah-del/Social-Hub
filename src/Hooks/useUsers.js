import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getUserById,
  subscribe,
  unsubscribe,
  addFriend,
  acceptFriend,
  updateUser,
} from "../Redux/slices/usersSlice";

export const useUsers = () => {
  const dispatch = useDispatch();
  const { users, userData, status, error } = useSelector(
    (state) => state.users
  );

  const fetchAllUsers = () => {
    dispatch(getAllUsers());
  };

  const fetchUserById = (userId) => {
    dispatch(getUserById(userId));
  };

  const handleSubscribe = (userId) => {
    dispatch(subscribe(userId));
  };

  const handleUnsubscribe = (userId) => {
    dispatch(unsubscribe(userId));
  };

  const handleAddFriend = (friendId) => {
    dispatch(addFriend(friendId));
  };

  const handleAcceptFriend = (friendId, receiverId) => {
    dispatch(acceptFriend({ friendId, receiverId }));
  };

  const handleUpdateUser = (userId, values) => {
    return dispatch(updateUser({ userId, values }));
  };

  return {
    users,
    userData,
    status,
    error,
    fetchAllUsers,
    fetchUserById,
    handleSubscribe,
    handleUnsubscribe,
    handleAddFriend,
    handleAcceptFriend,
    handleUpdateUser,
  };
};
