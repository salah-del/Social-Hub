import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import PopupModal from "./PopupModal";
const UserInfo = ({ user, status, posts, postsStatus, edit }) => {
  return (
    <div className="flex flex-col items-start gap-4 mt-11 md:mt-3">
      {status === "loading" ? (
        <Skeleton width={200} height={30} />
      ) : (
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>

          <Link
            to=""
            className={`${
              !edit && "hidden"
            } px-3 py-1 -mb-1 bg-gray-500 hover:bg-gray-600 rounded-full text-c-white transition-colors duration-200`}
          >
            Edit Profile
          </Link>
        </div>
      )}
      <ul className="flex gap-5 max-sm:gap-2">
        {postsStatus === "loading"? (
          <>
            <Skeleton width={70} />
            <Skeleton width={90} />
            <Skeleton width={90} />
          </>
        ) : (
          <>
            <li className="cursor-pointer">{posts?.length || 0} Post</li>
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
  );
};

export default UserInfo;
