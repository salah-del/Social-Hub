import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Community from "../../Components/socialHub/MyCommunities/Community";
import CreateCommunity from "../../Components/socialHub/MyCommunities/CreateCommunity";
import NoCommunitiesJoined from "../../Components/socialHub/MyCommunities/NoCommunitiesJoined";
import { updateUserCommunities } from "../../Redux/slices/userSlice";

const MyCommunities = memo(() => {
  const { user, status, error } = useSelector((state) => state.user);
  const [openCreateCommunityModal, setOpenCreateCommunityModal] = useState(false);
  const [allMyCommunities, setallMyCommunities] = useState(
    user && user.communities ? user.communities : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    setallMyCommunities(user && user.communities ? user.communities : []);
  }, [user]);

  const handleOpenCreateCommunityModal = () => {
    setOpenCreateCommunityModal(true);
  };

  const handleCloseCreateCommunityModal = () => {
    setOpenCreateCommunityModal(false);
  };

  const handleLeaveCommunity = (commId, restore = false) => {
    setallMyCommunities((prev) => {
      const updatedCommunities = restore
        ? [...prev, user.communities.find((comm) => comm._id === commId)]
        : prev.filter((id) => id !== commId);

      dispatch(updateUserCommunities(updatedCommunities));

      return updatedCommunities;
    });
  };

  const handleDeleteCommunity = (commId, restore = false) => {
    setallMyCommunities((prev) => {
      const updatedCommunities = restore
        ? [...prev, user.communities.find((comm) => comm._id === commId)]
        : prev.filter((id) => id !== commId);

      dispatch(updateUserCommunities(updatedCommunities));

      return updatedCommunities;
    });
  };

  const handleAddCreatedCommunity = (comm) => {
    if (comm) {
      setallMyCommunities([...allMyCommunities, comm]);
      dispatch(updateUserCommunities([...user.communities, comm]));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="w-full flex items-center mb-10 justify-between border-b pb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Communities</h2>
        {user && user.communities && user.communities.length > 0 && (
          <button
            onClick={handleOpenCreateCommunityModal}
            className="text-xs bg-main-color hover:bg-sec-color text-white py-2 px-4 rounded-md shadow-lg transition-all duration-300"
          >
            Create Community
          </button>
        )}
      </div>

      {status === "failed" && (
        <p className="text-red-500 font-semibold">{error.message}</p>
      )}

      {status === "succeeded" && (
        <>
          {user && allMyCommunities && allMyCommunities.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-2">
              {allMyCommunities.map((communityID) => (
                <div
                  key={communityID}
                  className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <Community
                    user={user ? user : null}
                    communityId={communityID}
                    leaveCommunity={handleLeaveCommunity}
                    deleteCommunity={handleDeleteCommunity}
                  />
                </div>
              ))}
            </div>
          )}

          {user && allMyCommunities.length === 0 && (
            <NoCommunitiesJoined
              handleOpenCreateCommunityModal={handleOpenCreateCommunityModal}
            />
          )}
        </>
      )}

      {openCreateCommunityModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
            <CreateCommunity
              handleCreateCommunity={handleAddCreatedCommunity}
              closeCreateModal={handleCloseCreateCommunityModal}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default MyCommunities;
