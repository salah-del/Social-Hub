import { useLocation } from 'react-router-dom';

const VideoPlayer = () => {

    const location = useLocation();
    const video = location.state?.video || "";
    console.log("Video player", video);
    
    return (
        <div>VideoPlayer</div>
    )
}

export default VideoPlayer