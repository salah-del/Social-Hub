import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import { API } from '../../../Api/Api';
import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import Cookies from 'js-cookie';
import { showToast } from '../../../Utils/showToast';

const VideoLikes = memo(({oldLikes, oldDislikes, videoId}) => {
    
    const [likes, setLikes] = useState(oldLikes ? oldLikes.length : 0);
    const [disLikes, setDisLikes] = useState(oldDislikes ? oldDislikes.length : 0);
    const [didILike, setDidILike] = useState(false);
    const [didIDisLike, setDidIDisLike] = useState(false);
    const currUserId = Cookies.get("userID");
    
    useEffect(() => { 
        if (oldLikes && oldLikes.length > 0) { 
            setLikes(oldLikes.length);
            setDidILike(oldLikes.includes(currUserId));
        }
        else { 
            setLikes(0);
        }
        if (oldDislikes && oldDislikes.length > 0) { 
            setDisLikes(oldDislikes.length );
            setDidIDisLike(oldDislikes.includes(currUserId));
        }
        else { 
            setDisLikes(0);
        }
    }, [oldLikes, oldDislikes, videoId]);
    
    const handleLike = async () => { 
        setLikes(prev => prev + 1);
        setDidILike(true);
        const oldDidIDislike = didIDisLike;
        if (didIDisLike) { 
            setDisLikes(prev => prev -1 );
            setDidIDisLike(false);
        }
        try {
            await axios.put(`${API.likeVideo}/${videoId}`);
        } catch (error) {
            showToast('error', error?.response?.data?.message || "Like isn't sent");
            setLikes(prev => prev - 1);
            setDidILike(false);
            setDidIDisLike(oldDidIDislike);
            if (oldDidIDislike) setLikes(prev => prev + 1);
        }
    }
    const handleDisLike = async () => { 
        setDisLikes(prev => prev + 1 );
        setDidIDisLike(true);
        const oldDidILike = didILike;
        if (didILike) { 
            setLikes(prev => prev - 1);
            setDidILike(false);
        }
        try {
            await axios.put(`${API.disLikeVideo}/${videoId}`);
        } catch (error) {
            showToast('error', error?.response?.data?.message || "Dislike isn't sent");
            setDisLikes(prev => prev - 1 );
            setDidIDisLike(false);
            setDidILike(oldDidILike);
            if (oldDidILike) setLikes(prev => prev + 1);
        }
    }
    return (
        <div className='border  rounded-full flex items-center  overflow-hidden'>

            <button onClick={handleLike} className={`${didILike ? "bg-gray-200 pointer-events-none" : "hover:bg-gray-100"} rounded-l-full py-2 sm:py-3 pl-3 sm:pl-5 pr-3 sm:pr-5 trans flex items-center gap-1  border-r`}>
                <AiOutlineLike className='text-lg sm:text-xl' />
                {
                    (likes != null ? likes  : 0)
                }
                
            </button>
            <button onClick={handleDisLike} className={`${didIDisLike ? "bg-gray-200 pointer-events-none" : "hover:bg-gray-100"} rounded-r-full py-2 sm:py-3 pr-3 sm:pr-5 pl-3 sm:pl-5 trans flex items-center gap-1 hover:bg-gray-100`}>
                <AiOutlineDislike className='text-lg sm:text-xl mt-0.5' />
                {
                    ( disLikes != null ? disLikes : 0)
                }
            </button>
        </div>
    )
})

export default VideoLikes