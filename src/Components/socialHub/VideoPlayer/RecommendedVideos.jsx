import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoGrid from "../MainPage/VideoGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../Api/Api";
import Skeleton from "react-loading-skeleton";

const RecommendedVideos = () => {
  const {id:videoId} = useParams(); 
  const { ref, inView } = useInView({ triggerOnce: true });
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  // const { videos, status, error } = useSelector((state) => state.randomVideos);
  useEffect(() => { 
    const getVideos = async () => { 
      try {
        setLoading(true)
        const res = await axios.get(`${API.getRandomVideos}?page=${1}`);
        setVideos(res.data.videos)
      } catch (error) {
        setLoading(false)
        setError(error?.response?.data?.message || "Something went wrong with fetching videos")
      }finally { 
        setLoading(false)
      }
    }
    getVideos()
  }, [videoId])

  if (loading) 
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xl:gap-5">
          {Array.from({ length: 12 }).map((_, index) => (
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
    )
  if (error) 
    return <div className="w-full flex items-center justify-center text-gray-600 text-center">{error}</div>
  
  return (
    <>
    {
      
      <div ref={ref}>
        {inView  && videos && videos.length > 0 && <div>
            <VideoGrid initVideos={
                videos.filter((vid) => vid._id != videoId)
              }/>
        </div>}
      </div>
      // <div ref={ref}>
      //   {inView  && videos && videos.length > 0 && <div>
      //       <VideoGrid initVideos={
      //         videos.length > 21 ? 
      //           videos.filter((vid) => vid._id != videoId).slice(0, 21)
      //           :
      //           videos.filter((vid) => vid._id!= videoId)
      //         }/>
      //   </div>}
      // </div>
    }

    </>
  )
}

export default RecommendedVideos;