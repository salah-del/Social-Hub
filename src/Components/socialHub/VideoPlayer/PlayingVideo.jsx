import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import { API } from '../../../Api/Api';
import ChannelDetails from './ChannelDetails';
import VideoLikes from './VideoLikes';
import PlayingVideoOptions from './PlayingVideoOptions';
import VideoViews from './VideoViews';
import VideoDescription from './VideoDescription';
import Skeleton from 'react-loading-skeleton';

const PlayingVideo = () => {
    const location = useLocation();
    const video = location.state?.video || "";
    const channel = location.state?.user || "";
    const [channelDetails, setChannelDetails] = useState(channel);
    const [videoUpdatedData, setVideoUpdatedData] = useState(video || null);
    const [loading, setLoading] = useState(true);
    const [restrictions, setRestrictions] = useState(false);
    const [error, setError] = useState("");
    
    useEffect(() => { 
        window.scrollTo(0, 0);
        const handleVideoData = async () => {
            if (video && video._id) { 
                setLoading(true);
                try {
                    const res = await axios.get(`${API.getVideo}/${video._id}`);
                    if (res && res.data && res.data.video){ 
                        setVideoUpdatedData(res.data.video);
                    }
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                    setError(error?.response?.data?.message || "Video unavailable");
                    setVideoUpdatedData(video);
                } finally { 
                    setLoading(false);
                }
            }
        };
        setError("");
        setRestrictions("");
        setChannelDetails(channel);
        handleVideoData();
    }, [channel, video, channelDetails]);
    
    const handlePlayerError = (error) => {
        console.log("ReactPlayer Error:", error);
        if (error == 101 || error == 150) {
            setRestrictions(true)
            setError("This video can't be played here for some restrictions, you can visit it on from here.");
        }
        else if (error == 100) { 
            setError("This video was removed or marked private.");
        }
    };
    

    const formatYouTubeEmbedUrl = (url) => {
        const videoIdMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
    };

    const embedUrl = formatYouTubeEmbedUrl(videoUpdatedData.videoUrl);

    if (!video) return <div>Something went wrong</div>;
    

    return (
        <div className='w-full  flex flex-col gap-4'>
            
            <div className='w-[calc(100%+48px)] sm:w-full -ml-6 -mt-6 sm:mt-0 sm:ml-0 h-[320px] sm:h-[400px] lg:h-[450px] xl:h-[500px]'>
                {!error && !restrictions && <ReactPlayer
                    url={embedUrl}
                    playing={true}
                    width={'100%'}
                    height={'100%'}
                    onError={handlePlayerError}
                    controls={true}
                />}
                {
                    error && restrictions && 
                    <div className='flex w-full bg-gray-100 rounded-md h-full items-center justify-center flex-col gap-2'>
                        <p className='text-xl font-semibold text-gray-600'>{error}</p>
                        <a href={video.videoUrl} target='_blank' className='px-3 py-2 rounded-md bg-main-color text-sm text-white trans hover:bg-sec-color'>Open video</a>
                    </div>
                }
                {
                    error && !restrictions && 
                    <div className='flex w-full bg-gray-100 rounded-md h-full items-center justify-center flex-col gap-2'>
                        <p className='text-xl font-semibold text-gray-600'>{error}</p>
                    </div>
                }
            </div>
            <p className='text-xl font-bold'>{videoUpdatedData?.title}</p>

            <div className='w-full flex flex-col md:flex-row  justify-between md:items-center gap-5 md:gap-0'>
                <ChannelDetails channelId={channelDetails?._id} name={channelDetails?.name} profilePicture={channelDetails?.profilePicture} />
                <div className='flex items-center justify-between md:gap-5'>
                    <PlayingVideoOptions videoURL={video.videoUrl} />
                    {
                        loading 
                        ? <Skeleton width={148} height={50} borderRadius={100} />
                        : <VideoLikes oldLikes={videoUpdatedData.likes} oldDislikes={videoUpdatedData.dislikes} videoId={video._id} />
                    }
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                {
                    loading 
                    ? <Skeleton width={50} height={20} className='ml-1'  />
                    : <VideoViews oldViews={videoUpdatedData.views} videoId={videoUpdatedData?._id}/>
                }
                <VideoDescription description={videoUpdatedData?.description} />
            </div>
        </div>
    );
};

export default PlayingVideo;
