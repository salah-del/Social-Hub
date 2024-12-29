import { useEffect, useState } from "react"
import { API } from "../../../Api/Api";
import axios from "axios";

const VideoViews = ({oldViews, videoId}) => {
  const [views, setViews] = useState(oldViews ? oldViews : 0);

  useEffect(() => { 
        const viewVideo = async () => { 
            try {
              await axios.put(`${API.viewVideo}/${videoId}`);
              setViews(prev => prev + 1);
            } catch (error) {
              setViews(oldViews);
            }
        }
        viewVideo();
  }, []);

  return (
    <p className="text-sm w-fit text-gray-600 ml-1">
      <span className="font-semibold text-black">{views ? views : 0} </span> 
      Views
    </p>
  )
}

export default VideoViews