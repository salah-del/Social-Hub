import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useSavedItems from "../../../../Hooks/ProfileHooks/useSavedItemsHook";
import Loader from "../../../../Utils/Loader";
import VideoCard from "../../MainPage/VideoCard";

const SavedVideos = ({savedVideos, edit}) => {
    
    const {videos,videosLoading:loading,  handleUnsaveVideo, getSavedVideos} = useSavedItems();

    useEffect(() => {
        if (savedVideos?.length && videos.length == 0) {
            console.log("called")
            getSavedVideos(savedVideos);
        }
    }, [savedVideos]);

    const handleUnSaveVideoClicked = (video) => { 
        handleUnsaveVideo(video);
    }

    return ( (loading || (edit && !savedVideos)) ? 
        <div className="w-full h-[250px] flex items-center justify-center">
            <Loader />
        </div>
        : (
            (videos && videos.length > 0) ? 
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
                            <VideoCard video={video} isSaved={edit} unsaveVideo={handleUnSaveVideoClicked} />
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