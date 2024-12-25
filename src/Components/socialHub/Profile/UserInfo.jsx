import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import PopupModal from "./PopupModal";
import UserInformation from "./Update/UserInformation";
const UserInfo = ({ user, status, posts, postsStatus, edit }) => {
  return (
    <div className="flex flex-col items-start gap-4 mt-11 md:mt-3">
      {status === "loading" ? (
        <Skeleton width={200} height={30} />
      ) : (
        <div className="flex items-center max-[450px]:items-start gap-3 max-[450px]:flex-col">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          {/* Update User */}
          <UserInformation user={user} edit={edit} />
        </div>
      )}
      <ul className="flex gap-5 max-sm:gap-2">
        {postsStatus === "loading" ? (
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
