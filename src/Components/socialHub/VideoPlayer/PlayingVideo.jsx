import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import { Img } from 'react-image';
import Skeleton from 'react-loading-skeleton';
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { API } from '../../../Api/Api';
const PlayingVideo = () => {
    const location = useLocation();
    const video = location.state?.video || "";
    const channel = location.state?.user || "";
    const user = useSelector((state) => state.user.user);
    const [views, setViews] = useState(video ? video.views : 0);
    const [amISubscriber, setAmISubscriber] = useState(false);
    console.log(channel);
    
    
    const [error, setError] = useState("");

    useEffect(() => { 
        window.scrollTo(0, 0);
        const viewVideo = async () => { 
            const response = await axios.put(`${API.viewVideo}/${video._id}`);
            
            
            if (response.data) { 
                setViews(prev => prev + 1);
            }
            
        }
        const handleAmISubscriber = () => { 
            if (channel && channel.SubscriberedOrFollowed && user) { 
                const answer = channel.SubscriberedOrFollowed.find((follower) => follower === user._id);
                if (answer)
                    setAmISubscriber(answer);
                else if (answer == false)
                    setAmISubscriber(answer);
            }
            setAmISubscriber(false);
        }
        viewVideo();
        handleAmISubscriber();
    }, []);

    console.log("Video player", video);

    const handlePlayerError = (e) => {
        console.error("Video player error:", e);
        setError("An error occurred while loading the video. Please try again later.");
    };

    const reloadPage = () => { 
        window.location.reload();
    }

    const handleFollowAndUnfollow = () => { 
        if (channel && user) {
            if (amISubscriber) { 
                // unsbscribe
                
                setAmISubscriber(false);
            }
            else { 
                
                setAmISubscriber(true);
            }
        }
    }

    

    if (!video) return <div>Something went wrong</div>;
    if (error) 
        return <div className='font-semibold  w-full h-screen flex flex-col gap-3 items-center justify-center text-center text-xl '>
                    {error}
                    <button onClick={reloadPage} className=" text-xs trans bg-main-color hover:bg-sec-color text-white py-2 px-4 rounded-md">
                        Try Again
                    </button>   
                </div>

    return (
        <div className='w-full  flex flex-col gap-4'>
            
            <div className='w-full lg:h-[450px] xl:h-[500px]'>
                <ReactPlayer
                    url={video.videoUrl}
                    playing={true}
                    width={'100%'}
                    height={'100%'}
                    onError={handlePlayerError}
                    controls={true}
                />
            </div>
                <p className='text-xl font-bold'>{video.title}</p>

            {/* Channel Details */}
            <div className='flex items-center gap-3 '>
                {/* channel image */}
                <div className='max-w-10 h-10 rounded-full '>
                    {channel && channel.profilePicture ? 
                    <Img src={channel.profilePicture} className='w-full h-full rounded-full' loader={<div className='w-10 h-10 rounded-full'><Skeleton width={'100%'} height={'100%'} borderRadius={'100%'} /></div>} />
                    : <FaUserCircle className="text-gray-300 w-9 h-9" />
                }
                </div>
                <div className='flex flex-col gap-0.5 text-sm'>
                    <p className=''>{channel && channel.name}</p>
                    <p className='text-gray-500'>{channel && channel.SubscriberedOrFollowed && channel.SubscriberedOrFollowed.length} Subscribers</p>
                </div>
                <button  onClick={handleFollowAndUnfollow} className={` rounded-full ${amISubscriber ? "bg-white text-black hover:bg-gray-100" : "text-white hover:bg-sec-color bg-main-color"}  border shadow-sm py-2 px-8 text-sm ml-2  trans `}>{amISubscriber ? "Unsubscribe" :"Subscribe"}</button>
            </div>
        </div>
    );
};

export default PlayingVideo;
