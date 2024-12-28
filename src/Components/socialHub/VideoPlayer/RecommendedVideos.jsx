import { useDispatch, useSelector } from "react-redux";
import useProfileVideosHook from "../../../Hooks/ProfileHooks/useProfileVideosHook"
import VideoGrid from "../MainPage/VideoGrid";
import { useEffect } from "react";
import { getRandomVideos } from "../../../Redux/slices/randomVideos";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const RecommendedVideos = () => {
  const {id:videoId} = useParams(); 
  const { ref, inView } = useInView({ triggerOnce: true });
  
  const { videos, status, error } = useSelector((state) => state.randomVideos);
  const dispatch = useDispatch();
  useEffect(() => { 
    if (inView)
      dispatch(getRandomVideos()); 
  }, [inView]);

  return (
    <>
    {
      
      <div ref={ref}>
        {inView  && videos && videos.length > 0 && <div  >
            <VideoGrid initVideos={videos.filter((vid) => vid._id != videoId)} />
        </div>}
      </div>
    }

    </>
  )
}

export default RecommendedVideos