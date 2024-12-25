import { useState, useEffect } from "react";
import axios from "axios";
import { showToast } from "../Utils/showToast";
import { API } from "../Api/Api";

const UsersActionsHook = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async (setLoading) => {
    try {
      setLoading(true);
      const response = await axios.get(API.getAllUsers);
      setUsers(response.data.users);
      console.log(response);
    } catch (error) {
      if (!error.response) {
        showToast("error", "Network error, please check your connection.");
      } else if (error.response.data) {
        showToast(
          "error",
          error.response.data.message || "Something went wrong."
        );
      } else {
        showToast("error", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, values, setLoading, toggleModal) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API.updateUser}/${userId}`, values);
      showToast("success", "Your information has been updated.");
      window.location.reload();
      toggleModal();
    } catch (error) {
      if (!error.response) {
        showToast("error", "Network error, please check your connection.");
      } else if (error.response.data) {
        showToast(
          "error",
          error.response.data.message || "Something went wrong."
        );
      } else {
        showToast("error", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const subscribeUser = async (userId, setLoading) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API.subscribe}/${userId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribeUser = async (userId, setLoading) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API.unsubscribe}/${userId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllUsers,
    users,
    updateUser,
    subscribeUser,
    unsubscribeUser,
  };
};

export default UsersActionsHook;
