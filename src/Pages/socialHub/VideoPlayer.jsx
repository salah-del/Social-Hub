import { lazy, Suspense, useEffect } from "react"
import PlayingVideoLoading from "../../Components/socialHub/VideoPlayer/PlayingVideoLoading"
import Loader from "../../Utils/Loader"
import { useParams } from "react-router-dom"
const PlayingVideo = lazy(() => import("../../Components/socialHub/VideoPlayer/PlayingVideo"))
const RecommendedVideos = lazy(() => import("../../Components/socialHub/VideoPlayer/RecommendedVideos"))
const VideoPlayer = () => {
    const {id} = useParams();
    useEffect(() => { 
        window.scrollTo(0,0);
    }, [id]);
    return (
        <div className="space-y-10">
            <Suspense fallback={<PlayingVideoLoading />}>
                <PlayingVideo />
            </Suspense>
            <Suspense fallback={<div className="w-full flex justify-center"> <Loader /> </div>}>
                <RecommendedVideos />
            </Suspense>
        </div>
    )
}

export default VideoPlayer