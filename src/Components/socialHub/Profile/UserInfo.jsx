import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PopupModal from "./PopupModal";
import UserInformation from "./Update/UserInformation";
import { usePosts } from "../../../Hooks/usePosts";
import { useEffect, useState } from "react";
const UserInfo = ({ user, loading, edit }) => {
  const { posts, status } = usePosts();
  const [nameUser, setnameUser] = useState("");

  useEffect(() => {
    if (user) {
      setnameUser(user.name);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-start gap-4 mt-11 md:mt-3">
      {loading ? (
        <Skeleton width={200} height={30} />
      ) : (
        <div className="flex items-center max-[450px]:items-start gap-3 max-[450px]:flex-col">
          <h2 className="text-2xl font-bold text-gray-800">{nameUser}</h2>
          {/* Update User */}
          <UserInformation user={user} edit={edit} setnameUser={setnameUser} />
        </div>
      )}
      <ul className="flex gap-5 max-sm:gap-2">
        {loading ? (
          <>
            <Skeleton width={70} />
            <Skeleton width={90} />
            <Skeleton width={90} />
          </>
        ) : (
          <>
            <li className="cursor-pointer">{posts.length} Post</li>
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
