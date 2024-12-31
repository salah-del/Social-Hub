import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VideoCard from "../../MainPage/VideoCard";

const SavedVideos = ({savedVideos}) => {
    console.log(savedVideos);
    
    return (
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
            {savedVideos && savedVideos.map((video) => (
                <SwiperSlide key={video._id} >
                    <div>
                        <VideoCard video={video} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SavedVideos