import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import InputForm from "../../../helpers/InputForm";
import PasswordForm from "../../../helpers/PasswordForm";
import ButtonForm from "../../../helpers/ButtonForm";
import UsersActionsHook from "../../../../Hooks/UsersActionsHook";
function CoverPicture({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const { updateUser } = UsersActionsHook();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    coverPicture: "",
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
    if (user && user.coverPicture) {
      setValues((prev) => ({
        ...prev,
        coverPicture: user.coverPicture,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser(user._id, values, setLoading, toggleModal);
  };
  return (
    <>
      <div
        onClick={toggleModal}
        className={`opacity-0 group-hover:opacity-100 transition duration-300 flex items-center gap-1 p-2.5 bg-black bg-opacity-50 text-white rounded-full absolute -bottom-1 left-14 transform -translate-x-1/2 -translate-y-1/2 max-sm:text-sm max-sm:p-1.5 max-sm:left-10 cursor-pointer`}
      >
        Edit
        <FaCamera size={15} />
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
                Update Cover Picture
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
              {values.coverPicture && (
                <div className="mb-4">
                  <img
                    src={values.coverPicture}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded"
                  />
                </div>
              )}
              <InputForm
                labelName={"URL of Cover Picture"}
                type={"text"}
                name={"coverPicture"}
                value={values.coverPicture}
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
              <ButtonForm title={"Update Picture"} loading={loading} />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CoverPicture;
