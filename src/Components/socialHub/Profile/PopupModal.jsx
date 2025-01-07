import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import profile from "../../../assets/profile.jpg";
import LazyImage from "../../../Utils/LazyImage";
import { Link } from "react-router-dom";
import { API } from "../../../Api/Api";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // استيراد Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // استيراد أنماط Skeleton

function PopupModal({ count, title, usersId }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    if (usersId?.length > 0) {
      setLoading(true);
      try {
        // جلب البيانات باستخدام Promise.all
        const Users = await Promise.all(
          usersId.map(async (id) => {
            try {
              const response = await axios.get(`${API.getUserById}/${id}`);
              return response.data; // استخدم البيانات المسترجعة
            } catch (error) {
              console.error("Error fetching user data", error);
            }
          })
        );
        setUsers(Users.filter(Boolean)); // إزالة الـ undefined لو فيه أخطاء أثناء الجلب
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      } finally {
        setLoading(false);
      }
    }
  };
  // console.log(users);
  

  useEffect(() => {
    fetchUsers();
  }, [user]);

  return (
    <>
      {/* زرار فتح المودال */}
      <div onClick={toggleModal} className="cursor-pointer">
        {count} {title}
      </div>

      {/* Overlay ومحتوى المودال */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-60 z-50"
          onClick={toggleModal} // يقفل المودال لو ضغطت على الخلفية
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-5 relative"
            onClick={(e) => e.stopPropagation()} // يمنع انتشار الحدث هنا
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-main-color transition"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {/* قائمة الـ Following */}
            <ul className="space-y-4 overflow-y-auto max-h-[320px]">
              {loading ? (
                // عرض Skeleton أثناء التحميل
                Array.from({ length: 5 }).map((_, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Skeleton circle width={40} height={40} />
                    <Skeleton width={150} height={23} />
                  </li>
                ))
              ) : users.length === 0 ? (
                <p className="text-gray-500 text-center">{`No ${title} found.`}</p>
              ) : (
                users.map((value, index) => (
                  <Link key={index} to={`/socialHub/profile/${value._id}`}>
                    <li className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition cursor-pointer">
                      <LazyImage
                        src={value?.profilePicture || profile}
                        alt="profile"
                        className="w-10 h-10 rounded-full cursor-pointer"
                      />
                      <span className="text-gray-700 font-medium cursor-pointer">
                        {value.name}
                      </span>
                    </li>
                  </Link>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupModal;