import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { MdAddHomeWork } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { API } from "../../Api/Api";
import Modal from "../../Utils/Modal";
import { getDateFormatted } from './../../Utils/getDateFormatted';
import { IoMdArrowDropright } from "react-icons/io";
const Admin = lazy(() => import("../../Components/socialHub/MyCommunities/Admin"));

const MyCommunities = () => {
  const { user, status, error } = useSelector((state) => state.user);
  const [openCreateCommunityModal, setOpenCreateCommunityModal] = useState(false);
  const [openAdmins, setOpenAdmins] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCommunities = async () => {
      if (!user?.communities?.length) {
        setLoadingCommunities(false);
        return;
      }

      try {
        const communityDetails = await Promise.all(
          user.communities.map(async (communityId) => {
            const response = await axios.get(`${API.getCommunityById}/${communityId}`); // Replace with your actual endpoint
            console.log(response.data);
            
            return response.data; // Assuming response.data contains the community details
          })
        );
        console.log(communityDetails);
        const initialArray = Array(user.communities.length).fill(false);
        setOpenAdmins(initialArray);
        setCommunities(communityDetails);
      } catch (err) {
        console.error("Error fetching communities:", err);
        setFetchError("Failed to load community details. Please try again.");
      } finally {
        setLoadingCommunities(false);
      }
    };

    fetchCommunities();
  }, [user]);

  const handleOpenCreateCommunityModal = () => {
    setOpenCreateCommunityModal(true);
  };
  const handleCloseCreateCommunityModal = () => {
    setOpenCreateCommunityModal(false);
  };
  const toggleAdmins = (index) => { 
    setOpenAdmins((prevState) =>
      prevState.map((item, i) => (i === index ? !item : false))
    );  
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full flex items-end mb-16 justify-between">
        <h2 className="text-3xl font-bold ">My Communities</h2>
        {user && user.communities && user.communities.length > 0 && (
          <button
            onClick={handleOpenCreateCommunityModal}
            className="text-xs trans bg-main-color hover:bg-sec-color text-white py-2 px-4 rounded-md"
          >
            Create Community
          </button>
        )}
      </div>
      {status === "failed" && <p>{error}</p>}

      {status === "succeeded" && (
        <>
          {loadingCommunities && (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(user?.communities?.length || 3)].map((_, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div  className="p-4 border w-full border-gray-200 rounded-md">
                    <Skeleton width={'50%'} height={20} count={3} />
                  </div>
                  <div className="p-4 border w-full border-gray-200 rounded-md">
                    <Skeleton width={'25%'} height={20} count={3} />
                  </div>
                  <div className="p-4 border w-full border-gray-200 rounded-md">
                    <Skeleton width={'25%'} height={20} count={3} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingCommunities && fetchError && <p className="text-lg text-center">{fetchError}</p>}
          {!loadingCommunities && communities.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {communities.map(({community}, index) => (
                <div key={community.name} className="p-4 text-black flex flex-col gap-1 bg-gray-100 border border-gray-200 rounded-md">
                  <div className=" flex gap-1 items-end ">
                    <h3 className="font-bold text-lg">{community.name}</h3>
                    <p className="text-xs text-gray-600">Created {getDateFormatted(community.createdAt)}</p>
                  </div>
                  <div onClick={() => toggleAdmins(index)} className="flex flex-col p-2 w-44  cursor-pointer  rounded-md">
                    <h4  className="flex items-center"><IoMdArrowDropright className="text-lg select-none" /> Admins</h4>
                    {
                      openAdmins[index] && community.admins && community.admins.length > 0 && community.admins.map((admin) => ( 
                          <Suspense 
                            fallback={
                              <div className='w-fit flex gap-1'>
                                  <div className="w-6 h-6 rounded-full">
                                      <Skeleton height="100%" width="100%" borderRadius={"100%"} />
                                  </div>
                                  <div className='w-56 h-3 rounded-sm'>
                                      <Skeleton height="100%" width="100%" borderRadius={"3px"} />
                                  </div>
                              </div>
                              }>
                            <Admin key={admin._id} admin={admin} />
                          </Suspense>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingCommunities && user &&  user.communities.length === 0  && (
            <div className="my-auto text-center w-full mt-40 flex gap-3 items-center justify-center flex-col h-full">
              <MdAddHomeWork className="text-[150px] text-main-color" />
              <p className="text-gray-500 font-semibold">
                You have not joined or created any communities yet.
              </p>
              <button
                onClick={handleOpenCreateCommunityModal}
                className="mt-4 text-xs trans bg-main-color hover:bg-sec-color text-white py-2 px-4 rounded-md"
              >
                Create Community
              </button>
            </div>
          )}
        </>
      )}

      {openCreateCommunityModal && (
        <Modal title={"Create Community"} onClose={handleCloseCreateCommunityModal}>
          LOL ya dholLOL ya dholLOL ya dholLOL ya dholLOL ya dholLOL ya dholLOL ya dholLOL ya dhol
        </Modal>
      )}
      
    </div>
  );
};

export default MyCommunities;
