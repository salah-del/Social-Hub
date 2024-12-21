import React from 'react'
const VideoCard = React.lazy(() => import('../MainPage/VideoCard'));
const MemoizedVideoCard = React.memo(VideoCard);
const VideoGrid = React.memo(({ videos, style }) => (
    <div className={style ? style : `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5`}>
        {videos.map((vid) => (
        <div key={vid._id} className="mx-auto w-full">
            <MemoizedVideoCard
                video={vid}
            />
        </div>
        ))}
    </div>
));

export default VideoGrid
