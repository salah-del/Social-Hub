import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {  FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { API } from "../../../../Api/Api";
import { showToast } from "../../../../Utils/showToast";
import { getUserById } from "../../../../Redux/slices/getUserById";
import { useDispatch } from "react-redux";
function ProfilePicture({ user }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    profilePicture: "",
    currentPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user && user.profilePicture) {
      setValues((prev) => ({
        ...prev,
        profilePicture: user.profilePicture,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${API.updateUser}/${user._id}`, values);
      console.log("User updated successfully:", response.data);
      showToast("success", "Profile picture updated successfully!");
      toggleModal(); // غلق المودال بعد التحديث
      dispatch(getUserById(user._id));
    } catch (error) {
      // التعامل مع الأخطاء
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
  console.log(values);

  return (
    <>
      {/* زر تعديل الصورة */}
      <div onClick={toggleModal} className="bg-black bg-opacity-50 rounded-full p-1 pl-[7.5px] absolute top-[59%] sm:top-[64%] right-[34%] lg:right-[38%] transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer">
        <FaUserEdit className="text-sm sm:text-lg  text-white" />
      </div>

      {/* مودال التعديل */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-60 z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md mx-2 w-full p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Update Profile Picture</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-main-color transition"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Preview */}
              {values.profilePicture && (
                <div className="mb-4">
                  <img
                    src={values.profilePicture}
                    alt="Preview"
                    className="w-40 h-40  ml-auto object-cover rounded"
                  />
                </div>
              )}
              <div className="space-y-1">
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-medium text-gray-700"
                >
                  URL of Profile Picture
                </label>
                <input
                  type="text"
                  id="profilePicture"
                  name="profilePicture"
                  value={values.profilePicture}
                  onChange={handleChange}
                  className="w-full p-2 border outline-none focus:border-gray-600 border-gray-300 rounded"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="currentPassword"
                  id="currentPassword"
                  name="currentPassword"
                  value={values.currentPassword}
                  onChange={handleChange}
                  className="w-full p-2 border outline-none focus:border-gray-600 border-gray-300 rounded"
                  placeholder="Enter your current password"
                />
              </div>

              {/* زر التحديث */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sec-color text-white p-2 rounded hover:bg-main-color transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Picture"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePicture;
