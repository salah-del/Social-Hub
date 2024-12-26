import { memo, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import useProfileVideosHook from "../../../../Hooks/ProfileHooks/useProfileVideosHook";
import Loader from "../../../../Utils/Loader";
import Modal from "../../../../Utils/Modal";
import VideoGrid from "../../MainPage/VideoGrid";
import AddNewVideoModal from "./AddNewVideoModal";

const ProfileVideos = memo(() => {
    const {user, status, error:userError} = useSelector((state) => state.user);
    const {videos, getUserVideos, loading:loadingVideos, error, addNewVideo, deleteVideo} = useProfileVideosHook();
    const [isAddNewVideoModalOpen, setIsAddNewVideoModalOpen] = useState(false);
    const [shownVideos, setshownVideos] = useState(videos);
    useEffect(() => { 
        if (user && user._id) { 
            getUserVideos(user._id);
        }
    }, [user]);
    useEffect(() => { 
        if (videos)
            setshownVideos(videos);
    }, [videos])

    const handleAddNewVideoModal = () => { 
        setIsAddNewVideoModalOpen(prev => !prev);
    }

    const handleAddNewVideo = (inputs) => { 
        if (user && user._id)
        addNewVideo(user._id, inputs);
    }

    // loading page
    if (status === "loading") { 
        return <div className={`w-full flex items-center justify-center mt-10`} ><Loader /></div>
    } 
    console.log("videos in profile videos : ", videos);
    
    // Loading videos from backend
    if (loadingVideos)  
        return (
            <div className="w-full flex flex-col gap-5 ">
                <div className="w-full blur flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 ">My videos</h2>
                    <button  className="ml-auto pointer-events-none text-xs bg-main-color px-3 py-2 text-white trans hover:bg-sec-color rounded-md ">
                        Add New Video
                    </button>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xl:gap-5">
                    {Array.from({ length: videos?.length || 6 }).map((_, index) => (
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
        <div className="w-full flex flex-col gap-6 ">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 ">My videos</h2>
                {videos && videos.length > 0 && <button onClick={handleAddNewVideoModal} className="ml-auto text-xs bg-main-color px-3 py-2 text-white trans hover:bg-sec-color rounded-md ">
                    Add New Video
                </button>}
            </div>

            {videos && videos.length > 0 && <div className="mb-10">
                <VideoGrid initVideos={videos} handleDeleteVideo={deleteVideo} inProfile={true} />
            </div>}

            {
                videos.length ==0 && <div className="w-full mt-16 text-center flex items-center flex-col gap-3">
                    <h1 className="  text-gray-500 text-2xl font-semibold">You don't have videos</h1>
                    <button onClick={handleAddNewVideoModal} className="text-xs bg-main-color px-3 py-2 text-white trans hover:bg-sec-color rounded-md ">
                        Add New Video
                    </button>
                </div>
            }
            
            {
                isAddNewVideoModalOpen && 
                <Modal title={'Add New Video'} onClose={handleAddNewVideoModal} >
                    <AddNewVideoModal addVideo={handleAddNewVideo}  />
                </Modal>
            }
        </div>
    )
})

export default ProfileVideos