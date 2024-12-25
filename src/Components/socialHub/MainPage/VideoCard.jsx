import axios from "axios";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiPlay } from 'react-icons/bi';
import { FaUserCircle } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { Img } from "react-image";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import { API } from "../../../Api/Api";
import { getDateFormatted } from "../../../Utils/getDateFormatted";
import LazyImage from "../../../Utils/LazyImage";
import useNavigateTo from "../../../Utils/navigateTo";
import { showToast } from "../../../Utils/showToast";
import sweetalert from "../../../Utils/sweetalert";
import { isVideoURL } from "../../../Utils/validateURLs";
const VideoCard = React.memo(({ video, handleOpenVideoEdit, handleDeleteVideo}) => {
  const navigateTo = useNavigateTo();
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true }); // Trigger once when in view
  const userId = Cookies.get("userID");

  const isValidUrl = useCallback(
    (url) => {
      try {
        new URL(url); // Checks if the URL is valid
        return true;
      } catch (error) {
        return false;
      }
    },
    [video]
  );

  useEffect(() => {
    if (inView) {
      // Fetch user data only when in view
      const getUser = async () => {
        const res = await axios.get(`${API.getUserById}/${video.userId}`);
        setUser(res.data);
        setIsLoaded(true); // Mark as loaded
      };
      getUser();
    }
  }, [inView, video.userId]);

  const validUrl = isValidUrl(video.thumbnailUrl) ? video.thumbnailUrl : "/src/assets/noImage.jpg";
  
  // `video/${video._id}`
  
  const handleNavToVideoPlayer = () => { 
    navigateTo({
      dest: `/socialHub/video/${video._id}`,
      state: { video: video, user }
    })
  }
  const handleNavToUser = () => { 
    if (user) { 
        navigateTo({
          dest: `/socialHub/profile/${user._id}`,
          state: { user: user }
        })
    }
  }
const optionsRef = useRef(null);

  const handleOpenOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  // Close the popover if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsOptionsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickEditBtn = () => { 
    const details = {
      _id:video._id,
      title: video.title,
      description: video.description,
      videoURL: video.videoUrl,
      thumbnailURL: video.thumbnailUrl,
      tags: video.tags,
    }
    handleOpenVideoEdit(details);
  }
  const handleClickDeleteBtn = async () => { 
    const res = await sweetalert.deleteOrNot({title:"Do you want to delete this video?", confirmBtn:"Delete", cancelBtn:"Cancel"});
    if (res.isConfirmed) { 
      handleDeleteVideo(video._id);
    }
  }

  const handleCopyVideoURL = () => { 
    if (video && video.videoUrl && isVideoURL(video.videoUrl) ) {
      console.log(video.videoUrl);
      
      navigator.clipboard.writeText(video.videoUrl)
        .then(() => {
          showToast('success', 'Video URL copied successfully');
        })
        .catch(() => {
          showToast( "error", "Failed to copy video URL");
        });
    } else {
      showToast( "error", "Invalid Video URL");
    }
  };
  const handleSaveOrUnsaveVideo = () => { 

  }

  return (
    <div  ref={ref} className="relative flex flex-col items-center cursor-pointer trans ">
      {inView ? (
        <div role="button" onClick={handleNavToVideoPlayer} className="min-w-full relative rounded-md group overflow-hidden">
          <Img
            src={validUrl}
            className="min-w-full overflow-hidden group-hover:scale-105 trans border rounded-md"
            loader={
              <div className="w-full h-48 min-[450px]:h-64 min-[550px]:h-80 sm:h-40 xl:h-44 min-[1290px]:h-52 animate-pulse">
                <Skeleton height="100%" width="100%" borderRadius={"4px"} />
              </div>
            }
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <BiPlay className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      ) : (
        // Placeholder while out of view
        <div className="w-full h-48 min-[450px]:h-64 min-[550px]:h-80 sm:h-40 xl:h-44 min-[1290px]:h-52 animate-pulse">
          <Skeleton height="100%" width="100%" borderRadius={"4px"} />
        </div>
      )}
      {inView && (isLoaded ? <div className="flex gap-2 mt-3 w-full items-center">
        <div role="button" onClick={handleNavToUser}> 
          { user && user.profilePicture ? (
            <LazyImage
              className="max-w-9 h-9 rounded-full"
              src={user.profilePicture}
              loader={
                <div className="w-9 h-9 rounded-full">
                  <Skeleton height="100%" width="100%" borderRadius={"100%"} />
                </div>
              }
            />
          ) : (
            <FaUserCircle className="text-gray-300 w-9 h-9" />
          )}
        </div>
        <div className="w-full flex flex-col gap-0.5">
              <div  className="relative group inline-block w-fit">
                  {/* <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105">Hover Me</button> */}
                    <h3 role="button" onClick={handleNavToVideoPlayer} className="text-sm lg:text-xs xl:text-sm font-semibold">
                      {video.title.length > 50 ? video.title.slice(0, 50) + " ..." : video.title}
                    </h3>
                  <div
                      className="opacity-0 w-[110%] hover:hidden text-sm  invisible group-hover:opacity-100 group-hover:visible absolute top-1/2 -left-2 trans  mt-2 bg-white text-gray-800 border border-gray-300 shadow-lg  z-10">
                      <p className="p-1 text-sm">{video.title}</p>
                  </div>
              </div>
            <div className="w-full flex flex-col text-gray-600">
              
              <div className="w-full flex justify-between items-center">
                <button onClick={handleNavToUser} className="w-fit text-xs trans hover:text-black">{user ? user.name : "Default User"}</button>
                <div onClick={handleOpenOptions} className="relative w-6 h-6 group rounded-full flex items-center justify-center trans focus:bg-gray-200 hover:bg-gray-200 -mr-1">
                  <SlOptionsVertical className="text-sm" />
                  {isOptionsOpen && <div ref={optionsRef} className="absolute  flex flex-col items-start overflow-hidden  -top-10 right-8 z-10 w-36 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm  ">
                      <button onClick={handleCopyVideoURL} className="w-full text-left pl-2 trans hover:bg-gray-200 cursor-pointer py-1">Copy video URL</button>
                      <button onClick={handleSaveOrUnsaveVideo} className="w-full text-left pl-2 trans hover:bg-gray-200 cursor-pointer py-1">Save Video</button>
                      {video.userId === userId && <button onClick={handleClickEditBtn} className="w-full text-left pl-2 trans hover:bg-gray-200 cursor-pointer py-1">Edit Video</button>}
                      {video.userId === userId && <button onClick={handleClickDeleteBtn} className="w-full text-main-color text-left pl-2 trans hover:bg-gray-200 cursor-pointer py-1">Delete Video</button>}
                  </div>}
                </div>
              </div>

              <div role="button" onClick={handleNavToVideoPlayer} className="w-full  font-normal items-center flex gap-1 text-xs" >
                <p className=" trans ">{video.views} views</p>
                <span className="w-1 h-1 rounded-full bg-gray-600 mt-0.5" />
                <p className="text-xs ">{getDateFormatted(video.createdAt)}</p>
                
              </div>
            </div>
        </div>
      </div>
      :
      <div className="w-full h-[50px] rounded-md flex gap-2 mt-3  items-center">
        <div className="min-w-9 h-9 rounded-full">
          <Skeleton height="100%" width="100%" borderRadius={"100%"} />
        </div>
        <div className="w-full h-full">
          <Skeleton width={"100%"} height={"100%"}  />  
        </div>
      </div>
      )
    }
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.video._id === nextProps.video._id &&
        JSON.stringify(prevProps.video) === JSON.stringify(nextProps.video);
});

export default VideoCard;
