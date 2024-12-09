import React, { useEffect, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure skeleton styles are imported
import { useDispatch, useSelector } from "react-redux";
import { getRandomVideos } from "../../Redux/slices/randomVideos";
const VideoCard = React.lazy(() => import('../../Components/socialHub/MainPage/VideoCard'));
const MemoizedVideoCard = React.memo(VideoCard);
const MainPage = () => {
  const dispatch = useDispatch();
  const { videos, status, error } = useSelector((state) => state.randomVideos);

  useEffect(() => {
    dispatch(getRandomVideos());
  }, [dispatch]);
  

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xl:gap-5">
      {/* Show skeletons while loading */}
        {status === "loading" && (
          Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="w-full mx-auto">
              <div className="w-full h-56 mb-4">
                <Skeleton height="100%" width="100%" />
              </div>
              <div className="w-full h-5">
                <Skeleton height="100%" width="100%" />
              </div>
            </div>
          ))
      )}
      {/* Show video cards when data is successfully loaded */}
      {status === "succeeded" && 
        videos.map((vid) => (
          <div key={vid._id} className="mx-auto w-full">
            <MemoizedVideoCard
              title={vid.title}
              thumbnailUrl={vid.thumbnailUrl}
              videoId={vid._id}
              userId={vid.userId}
            />
          </div>
        ))
      }

      {/* Show error message if loading failed */}
      {status === "failed" && (
        <div className="col-span-full text-center bg-gray-200 text-red-500">
          <p>{error || "Failed to load videos"}</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
{/* {status == "loading" && Array.from({ length: 9 }).map((_, index) => (
        <div>
          <div key={index} className="w-full h-56 mb-5">
            <Skeleton height="100%" width="100%" />
          </div>
          <div className="w-full h-5">
            <Skeleton height="100%" width="100%" />
          </div>
        </div>
      ))} */}