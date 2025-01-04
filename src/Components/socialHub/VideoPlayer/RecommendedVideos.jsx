import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoGrid from "../MainPage/VideoGrid";

const RecommendedVideos = () => {
  const {id:videoId} = useParams(); 
  const { ref, inView } = useInView({ triggerOnce: true });
  
  const { videos, status, error } = useSelector((state) => state.randomVideos);
  

  return (
    <>
    {
      
      <div ref={ref}>
        {inView  && videos && videos.length > 0 && <div  >
            <VideoGrid initVideos={
              videos.length > 21 ? 
                videos.filter((vid) => vid._id != videoId).slice(0, 21)
                :
                videos.filter((vid) => vid._id!= videoId)
              }/>
        </div>}
      </div>
    }

    </>
  )
}

export default RecommendedVideos