import { memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useProfileHook from "../../../../Hooks/userProfileHook";
import Skeleton from "react-loading-skeleton";
import Loader from "../../../../Utils/Loader";
import Modal from "../../../../Utils/Modal";
import AddNewVideoModal from "./AddNewVideoModal";

const ProfileVideos = memo(() => {
    const {user, status, error:userError} = useSelector((state) => state.user);
    const {videos, getUserVideos, loading:loadingVideos, error} = useProfileHook();
    const [isAddNewVideoModalOpen, setIsAddNewVideoModalOpen] = useState(false);

    useEffect(() => { 
        if (user && user._id) { 
            getUserVideos(user._id);
        }
    }, []);

    console.log(videos);

    const handleAddNewVideo = () => { 
        setIsAddNewVideoModalOpen(prev => !prev);
    }

    // loading page
    if (status === "loading") { 
        return <div className={`w-full flex items-center justify-center mt-10`} ><Loader /></div>
    } 

    // Loading videos from backend
    if (loadingVideos)  
        return (
            <div className="w-full flex flex-col gap-5 ">
                <button className="pointer-events-none blur-sm ml-auto text-sm bg-main-color px-3 py-2 text-white trans hover:bg-sec-color rounded-md ">
                    Add New Video
                </button>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xl:gap-5">
                    {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="w-full mx-auto">
                        <div className="w-full h-48 min-[450px]:h-64 min-[550px]:h-80 sm:h-40 xl:h-40 ">
                            <Skeleton height="100%" width="100%" />
                        </div>
                        <div className="w-full h-10 mt-3">
                            <Skeleton height="100%" width="100%" />
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        )
    
    return (
        <div className="w-full flex flex-col ">
            <button onClick={handleAddNewVideo} className="ml-auto text-sm bg-main-color px-3 py-2 text-white trans hover:bg-sec-color rounded-md ">
                Add New Video
            </button>

            {
                isAddNewVideoModalOpen && 
                <Modal title={'Add New Video'} onClose={handleAddNewVideo} >
                    <AddNewVideoModal />
                </Modal>
            }
        </div>
    )
})

export default ProfileVideos