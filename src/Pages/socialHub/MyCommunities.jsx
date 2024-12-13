import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdAddHomeWork } from "react-icons/md";
import Modal from "../../Utils/Modal";

const MyCommunities = () => {
  const {user, status, error} = useSelector((state) => state.user );
  const [openCreateCommunityModal, setOpenCreateCommunityModal] = useState(false);
  useEffect(() => { 
    window.scrollTo(0,0);
  }, []);

  const handleOpenCreateCommunityModal = () => {
    setOpenCreateCommunityModal(true);
  };
  const handleCloseCreateCommunityModal = () => {
    setOpenCreateCommunityModal(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full flex items-end mb-16 justify-between">
        <h2 className="text-3xl font-bold ">My Communities</h2>
        {user && user.communities && user.communities.length > 0 && <button onClick={handleOpenCreateCommunityModal} className=" text-xs trans bg-main-color hover:bg-sec-color text-white py-2 px-4 rounded-md">
          Create Community
        </button>}
      </div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && user.communities.length > 0 && <div className="grid grid-cols-1 ">
        { user.communities.map((community) => (
          <div key={community} className="p-4 border border-gray-200 rounded-md">
            <h3>{community}</h3>
          </div>
        ))}
      </div>}

      {
        status === "succeeded" && user.communities.length == 0 && 
        <div className=" my-auto text-center w-full mt-40  flex gap-3 items-center justify-center flex-col h-full">
          <MdAddHomeWork className="text-[150px] text-main-color" />
          <p className="text-gray-500 font-semibold">You have not joined or created any communities yet.</p>
          <button onClick={handleOpenCreateCommunityModal} className="mt-4 text-xs trans bg-main-color hover:bg-sec-color text-white py-2 px-4 rounded-md">
            Create Community
          </button>
        </div>
      }
      {openCreateCommunityModal && <Modal title={"Create Community"} onClose={handleCloseCreateCommunityModal}>
        LOL ya dholLOL ya dholLOL ya dholLOL ya dholLOL ya dholLOL ya dholLOL ya dholLOL ya dhol
      </Modal>}
    </div>
  );
};

export default MyCommunities;
