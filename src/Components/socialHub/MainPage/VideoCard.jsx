import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import Skeleton from "react-loading-skeleton";
import { API } from "../../../Api/Api";
import LazyImage from "../../../Utils/LazyImage";

const VideoCard = React.memo(({ title, thumbnailUrl, vidId, userId }) => {
  const [user, setUser] = useState(null)
  const isValidUrl = useCallback((url => { 
      try {
      new URL(url); // Checks if the URL is valid
      return true;
    } catch (error) {
      return false;
    }
  }), [thumbnailUrl]);

  useEffect(() => { 
    const getUser =  ( async () => { 
      const res = await axios.get(`${API.getUserById}/${userId}`);
      setUser(res.data);
    })
    getUser();
  }, [userId])

  const validUrl = isValidUrl(thumbnailUrl) ? thumbnailUrl : "/src/assets/noImage.jpg";
  return (
    <div className=" flex flex-col items-center cursor-pointer trans group">
      {<div className="min-w-full rounded-md  overflow-hidden">
        <LazyImage src={validUrl} className={`min-w-full overflow-hidden group-hover:scale-105 trans  border rounded-md`} loader={<div className={`w-full h-36 lg:h-48 xl:h-56  animate-pulse`}><Skeleton height="100%" width="100%" /></div>} />
      </div>}
      <div className="flex gap-2 mt-2 w-full items-center">
        <div>
          {user && user.profilePicture ?
            <LazyImage className="w-9 h-9 rounded-full" src={user.profilePicture} loader={<div className="w-9 h-9 rounded-full"><Skeleton height="100%" width="100%" borderRadius={"100%"} /></div>}  />
            : <FaUserCircle className="text-gray-300 w-9 h-9 " />}
        </div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
    </div>
  );
},
  (prevProps, nextProps) => {
    // Prevent re-render if the title is the same
    return prevProps.title === nextProps.title;
  }
);

export default VideoCard;