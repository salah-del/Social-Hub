import { FriendRequest } from "./FriendRequest";
import { FriendCard } from "./FriendCard";
import { useOutletContext } from "react-router-dom";
import ItemsCarousel from "./FriendReCarousel";
import Loader from "../../../../Utils/Loader";
import { useSelector } from "react-redux";
export default function Friends() {
  const { user, edit, loading } = useOutletContext();
  
  console.log(user);

  if (!user || loading) {
    return (
      <div className={`w-full flex items-center justify-center mt-32`}>
        <Loader />
      </div>
    );
  }

  

  return (
    <div className="max-w-7xl mx-auto px-4 py-5 mb-4">
      {edit && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>
          <ItemsCarousel
            items={user.friendRequests}
            CardComponent={FriendRequest}
            message={"No friend requests at the moment."}
          />
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {edit ? "Your Friends" : "Friends"}
        </h2>
        {user.friends.length === 0 ? (
          <div className="w-full mt-14 text-center flex items-center flex-col gap-3">
            <h1 className="  text-gray-500 text-2xl font-semibold">
              {edit ? "You don't have friends" : "No friends found."}
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {user.friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} edit={edit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
