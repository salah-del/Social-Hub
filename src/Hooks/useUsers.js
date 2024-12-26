import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getUserById,
  subscribe,
  unsubscribe,
  addFriend,
  acceptFriend,
  updateUser,
  searchByName,
} from "../Redux/slices/usersSlice";

export const useUsers = () => {
  const dispatch = useDispatch();
  const { users, userData, status, error, statusUpdate } = useSelector(
    (state) => state.users
  );

  const fetchAllUsers = () => {
    dispatch(getAllUsers());
  };

  const fetchUserById = (userId) => {
    dispatch(getUserById(userId));
  };

  const handleSubscribe = (userId) => {
    return dispatch(subscribe(userId));
  };

  const handleUnsubscribe = (userId) => {
    return dispatch(unsubscribe(userId));
  };

  const handleAddFriend = (friendId) => {
    return dispatch(addFriend(friendId));
  };

  const handleAcceptFriend = (friendId, receiverId) => {
    return dispatch(acceptFriend({ friendId, receiverId }));
  };

  const handleUpdateUser = (userId, values) => {
    return dispatch(updateUser({ userId, values })).unwrap();;
  };

  const handleSearchByName = (query) => {
    dispatch(searchByName(query));
  };

  return {
    users,
    userData,
    status,
    error,
    statusUpdate,
    fetchAllUsers,
    fetchUserById,
    handleSubscribe,
    handleUnsubscribe,
    handleAddFriend,
    handleAcceptFriend,
    handleUpdateUser,
    handleSearchByName,
  };
};
