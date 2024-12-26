import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import InputForm from "../../../helpers/InputForm";
import PasswordForm from "../../../helpers/PasswordForm";
import ButtonForm from "../../../helpers/ButtonForm";
import { useUsers } from "../../../../Hooks/useUsers";
import { useDispatch } from "react-redux";
import { getCurrUser } from "../../../../Redux/slices/userSlice";
function ProfilePicture({ user }) {
  const dispatch = useDispatch();
  const { fetchUserById, handleUpdateUser, statusUpdate } = useUsers();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
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
    await handleUpdateUser(user._id, values);
    toggleModal();
    fetchUserById(user._id);
    dispatch(getCurrUser(user._id));
  };
  return (
    <>
      <div
        onClick={toggleModal}
        className="bg-black bg-opacity-50 rounded-full p-1 pl-[7.5px] absolute top-[59%] sm:top-[64%] right-[34%] lg:right-[38%] transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
      >
        <FaUserEdit className="text-sm sm:text-lg  text-white" />
      </div>

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
              <h2 className="text-lg font-semibold text-sec-color">
                Update Profile Picture
              </h2>
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
              <InputForm
                labelName={"URL of Profile Picture"}
                type="text"
                name="profilePicture"
                value={values.profilePicture}
                onChange={handleChange}
                placeholder="Enter image URL"
                condition={false}
                onBlur={null}
                errorMessage={null}
              />
              <PasswordForm
                labelName={"Current Password"}
                name={"currentPassword"}
                value={values.currentPassword}
                onChange={handleChange}
                PasswordLight={values.currentPassword.length}
                onBlur={null}
                errorMessage={null}
                condition={false}
              />
              <ButtonForm
                title={"Update Picture"}
                loading={statusUpdate === "loading"}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePicture;
