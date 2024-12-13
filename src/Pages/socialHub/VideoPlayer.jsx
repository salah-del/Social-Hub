import PlayingVideo from "../../Components/socialHub/VideoPlayer/PlayingVideo"
import RecommendedVideos from "../../Components/socialHub/VideoPlayer/RecommendedVideos"

const VideoPlayer = () => {
    return (
        <div className="space-y-20">
            <PlayingVideo />
            <RecommendedVideos />
        </div>
    )
}

export default VideoPlayer