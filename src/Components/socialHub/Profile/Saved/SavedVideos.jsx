import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VideoCard from "../../MainPage/VideoCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../Api/Api";
import { showToast } from "../../../../Utils/showToast";
import Loader from "../../../../Utils/Loader";

const SavedVideos = ({savedVideos, edit}) => {
    console.log(savedVideos);
    
    const [loading, setloading] = useState(false)
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideosUserId = async () => {
            try {
                setloading(true)
                const videoPromises = savedVideos.map(async (video) => {
                    const res = await axios.get(`${API.getVideo}/${video._id}`);
                    return res.data.video; // Return the video data
                });
                const videos = await Promise.all(videoPromises);
                setVideos(videos)
            } catch (error) {
                console.error('Error fetching videos:', error);
                setloading(false)
            } finally { 
                setloading(false)
            }
        };

        if (savedVideos?.length) {
            getVideosUserId();
        }
    }, [savedVideos]);

    const handleUnsaveVideo = async(videoId) => { 
        const oldSavedVideos = videos ;
        setVideos(videos.filter((video) => video._id!== videoId));
        try {
            const res = await axios.post(`${API.unSaveVideo}/${videoId}`);
            showToast('success', "Video unsaved successfully")
        } catch (error) {
            
            showToast('error', error?.response?.data?.message || "Video wasn't unsaved");
            setVideos(oldSavedVideos);
        }
    }

    return ( loading ? 
        <div className="w-full h-32 flex items-center justify-center">
            <Loader />
        </div>
        : (
            (savedVideos && savedVideos.length > 0) ? 
            <Swiper className="w-full"
                modules={[Navigation, Pagination, Autoplay]} // إضافة الموديولات المطلوبة
                spaceBetween={24} // المسافة بين الشرائح
                slidesPerView={1} // عدد الشرائح المرئية في العرض
                // autoplay={{ delay: 2000 }} // إعدادات التشغيل التلقائي
                breakpoints={{
                    640: { slidesPerView: 2 }, // عرض شريحتين للشاشات الصغيرة
                    1024: { slidesPerView: 3 }, // ثلاث شرائح للشاشات المتوسطة
                    1280: { slidesPerView: 4 }, // أربع شرائح للشاشات الكبيرة
                }}
                >
                {videos && videos.map((video) => (
                    <SwiperSlide key={video._id} >
                        <div>
                            <VideoCard video={video} isSaved={edit} unsaveVideo={handleUnsaveVideo} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            :
            <div className="text-center text-gray-500 ">No saved videos.</div>
        )
    )
}

export default SavedVideos