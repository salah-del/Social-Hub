import { FaTable, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoVideo } from "react-icons/go";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsUser } from "../../../Redux/slices/postsReducer";
import PopupModal from "../../../Components/socialHub/Profile/PopupModal";
import ProfileAndCover from "../../../Components/socialHub/Profile/ProfileAndCover";
import PostsList from "../../../Components/socialHub/Profile/PostsList";
const MyProfile = () => {
  const { user, status, error } = useSelector((state) => state.user);
  // console.log(user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("videos");
  const [loading, setLoading] = useState(true); // حالة التحميل
  const {
    posts,
    status: postsStatus,
    error: postsError,
  } = useSelector((state) => state.posts);
  console.log(posts);
  // محاكاة تحميل البيانات
  useEffect(() => {
    dispatch(fetchPostsUser());
    const timer = setTimeout(() => setLoading(false), 1000); // بيانات تتحمل بعد 2 ثانية
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "videos", name: "VIDEOS", icon: <GoVideo /> },
    { id: "posts", name: "POSTS", icon: <FaTable /> },
    { id: "saved", name: "SAVED", icon: <FaBookmark /> },
  ];

  return (
    <div className="-m-2">
      <ProfileAndCover user={user} status={status} loading={loading} />

      {/* معلومات المستخدم */}
      <div className="flex flex-col items-start gap-4 mt-11 md:mt-3">
        {status === "loading" || loading ? (
          <Skeleton width={200} height={30} />
        ) : (
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <Link
              to=""
              className="px-3 py-1 -mb-1 bg-gray-500 hover:bg-gray-600 rounded-full text-c-white transition-colors duration-200"
            >
              Edit Profile
            </Link>
          </div>
        )}
        <ul className="flex gap-5 max-sm:gap-2">
          {status === "loading" || postsStatus === "loading" || loading ? (
            <>
              <Skeleton width={70} />
              <Skeleton width={90} />
              <Skeleton width={90} />
            </>
          ) : (
            <>
              <li className="cursor-pointer">{posts?.length} Post</li>
              <PopupModal
                count={user?.SubscriberedOrFollowed?.length}
                title="Following"
                usersId={user?.SubscriberedOrFollowed}
              />
              <PopupModal
                count={user?.SubscribersOrFollowers?.length}
                title="Followers"
                usersId={user?.SubscribersOrFollowers}
              />
            </>
          )}
        </ul>
      </div>

      {/* التبويبات */}
      <div className="w-full mt-4 border-t-2 border-gray-200">
        <div className="flex justify-center items-center gap-8 text-gray-500 uppercase text-sm -mt-[1.5px]">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 cursor-pointer py-3 ${
                activeTab === tab.id
                  ? "text-c-black border-t-2 border-c-black"
                  : "hover:text-gray-700"
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* المحتويات */}
      <PostsList />
    </div>
  );
};

export default MyProfile;
