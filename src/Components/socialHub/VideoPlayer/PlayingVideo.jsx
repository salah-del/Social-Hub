import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { API } from '../../../Api/Api';
import { showToast } from '../../../Utils/showToast';
import ChannelDetails from './ChannelDetails';
const PlayingVideo = () => {
    const location = useLocation();
    const video = location.state?.video || "";
    const channel = location.state?.user || "";
    console.log("video : ", video);
    console.log("channel : ", channel);
    const user = useSelector((state) => state.user.user);
    const [views, setViews] = useState(video ? video.views : 0);
    const [amISubscriber, setAmISubscriber] = useState(false);
    const [error, setError] = useState("");
    


    useEffect(() => { 
        window.scrollTo(0, 0);
        const viewVideo = async () => { 
            try {
                const response = await axios.put(`${API.viewVideo}/${video._id}`);
                setViews(prev => prev + 1);
                console.log(response.data);
            } catch (error) {
                console.log(error)
                console.log(error?.response?.data || "Something went wrong in viewing the video");
                setViews(prev => prev - 1);
            }
        }
        
        // const handleVideoLikes = async () => {
        //     if (video) { 
        //         try {
        //             const res = await axios.get(`${API.getVideo}`)
        //         } catch (error) {
                    
        //         }
        //     }
        //     if (video && currUserId) {
        //         if (video.likes.includes(currUserId)) { 
        //             // unlike
        //             try {
        //                 const res = await axios.put(`${API.unlikeVideo}/${video._id}`);
        //                 console.log(res.data);
        //                 setViews(prev => prev - 1);
                        
        //             } catch (error) {
        //                 showToast('error', "Something went wrong");
        //                 setViews(prev => prev + 1);
        //             }
        //         }
        //         else { 
        //             // like
        //             try {
        //                 const res = await axios.put(`${API.likeVideo}/${video._id}`);
        //                 console.log(res.data);
        //                 setViews(prev => prev + 1);
                        
        //             } catch (error) {
        //                 showToast('error', "Something went wrong");
        //                 setViews(prev => prev - 1);
        //             }
        //         }
        //     }
        // }
        viewVideo();
        // handleVideoLikes();
    }, []);

    console.log("Video player", video);

    const handlePlayerError = (e) => {
        console.error("Video player error:", e);
        setError("An error occurred while loading the video. Please try again later.");
    };

    const reloadPage = () => { 
        window.location.reload();
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
            <ChannelDetails channelId={channel?._id} name={channel?.name} profilePicture={channel?.profilePicture} /> 
            
        </div>
    );
};

export default PlayingVideo;
