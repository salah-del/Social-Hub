import React, { useEffect, useState } from 'react'
import EditVideoModal from './EditVideo';
import Modal from '../../../Utils/Modal';
import axios from 'axios';
import { API } from '../../../Api/Api';
import { showToast } from '../../../Utils/showToast';
const VideoCard = React.lazy(() => import('../MainPage/VideoCard'));
const MemoizedVideoCard = React.memo(VideoCard);
const VideoGrid = React.memo(({ initVideos:initialVideos, style, handleDeleteVideo }) => { 
    const [videos, setVideos] = useState(initialVideos);
    const [isVideoEditOpen, setIsVideoEditOpen] = useState(false);
    const [editedVideoDetails, setEditedVideoDetails] = useState(null);
    const [editedVideoId, setEditedVideoId] = useState(null);
    useEffect(() => { 
        setVideos(initialVideos);
    }, initialVideos)
    const handleOpenEditVdieo = (details) => { 
        const {_id, ...resetDetails} = details ; // Destructure _id and keep the rest
        setEditedVideoDetails(resetDetails);
        setEditedVideoId(_id);
        setIsVideoEditOpen(true);
    }
    const handleCloseEditVdieo = () => { 
        setIsVideoEditOpen(false);
    }
    const handleUpdateVideo = async (newUpdates) => { 
        const originalVideos = [...videos]; // Clone the original videos state
        console.log("used ID ",editedVideoId);
        try {
            // Perform optimistic update
            const updatedVideos = videos.map((video) => 
                video._id === editedVideoId ? { ...video, ...newUpdates } : video
            );
            setVideos(updatedVideos);

            // Send API request
            const res = await axios.put(`${API.updateVideo}/${editedVideoId}`, newUpdates);
            console.log(res.data);
            showToast("success", "Video updated successfully")
        } catch (error) {
            console.error("Failed to update video:", error);
            showToast("error", error?.response?.data?.message || "Can't update video")
            // Revert to the original state
            setVideos(originalVideos);
        }
    };
    const deleteVideo = async (videoId) => { 
        const originalVideos = [...videos]; // Clone the original videos state
        try {
            // Perform optimistic delete
            const updatedVideos = videos.filter((video) => video._id!== videoId);
            setVideos(updatedVideos);
            const response = await axios.delete(`${API.deleteVideo}/${videoId}`);
            showToast("success", "Video deleted successfully")
            handleDeleteVideo(videoId)
        }catch(error){
            showToast("error", error?.response?.data?.message || "Video wasn't deleted");
            setVideos(originalVideos);
        }
    }
    return (
    
        <div className={style ? style : `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5`}>
            {videos.map((vid) => (
            <div key={vid._id} className="mx-auto w-full">
                <MemoizedVideoCard
                    video={vid}
                    handleOpenVideoEdit={handleOpenEditVdieo}
                    handleDeleteVideo={deleteVideo}
                />
            </div>
            ))}
            {isVideoEditOpen && 
                <Modal title={'Edit Video'} onClose={handleCloseEditVdieo} >
                    <EditVideoModal videoDetails={editedVideoDetails} updateVideo={handleUpdateVideo}    />
                </Modal>}
        </div>
    )
});

export default VideoGrid
