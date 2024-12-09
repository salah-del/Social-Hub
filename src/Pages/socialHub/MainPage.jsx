import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure skeleton styles are imported
import { useDispatch, useSelector } from "react-redux";
import VideoGrid from "../../Components/socialHub/MainPage/VideoGrid";
import { getRandomVideos } from "../../Redux/slices/randomVideos";

const MainPage = () => {
  const dispatch = useDispatch();
  const { videos, status, error, hasFetched } = useSelector((state) => state.randomVideos);
  useEffect(() => {
    // to fetch only once
    if (!hasFetched) {
      dispatch(getRandomVideos());
    }
  }, [dispatch]);
  
  {/* Show skeletons while loading */}
  if (status === "loading") 
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xl:gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="w-full mx-auto">
              <div className="w-full h-24 lg:h-32 xl:h-56 mb-4">
                <Skeleton height="100%" width="100%" />
              </div>
              <div className="w-full h-5">
                <Skeleton height="100%" width="100%" />
              </div>
            </div>
          ))}
        </div>
    )

  {/* Show error message if loading failed */}
  if (status === 'failed')
    return (
      <div className="col-span-full text-center bg-gray-200 text-red-500">
        <p>{error || "Failed to load videos"}</p>
      </div>
    )

  return (
        <>
            {/* Show video cards when data is successfully loaded */}
          {status === "succeeded" && <VideoGrid videos={videos} />}
        </>
  );
};

export default MainPage;
