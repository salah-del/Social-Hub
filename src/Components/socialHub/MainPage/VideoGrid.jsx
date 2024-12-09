import React from 'react'
const VideoCard = React.lazy(() => import('../MainPage/VideoCard'));
const MemoizedVideoCard = React.memo(VideoCard);
const VideoGrid = React.memo(({ videos }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xl:gap-5">
        {videos.map((vid) => (
        <div key={vid._id} className="mx-auto w-full">
            <MemoizedVideoCard
            title={vid.title}
            thumbnailUrl={vid.thumbnailUrl}
            userId={vid.userId}
            user={vid.user}
            />
        </div>
        ))}
    </div>
));

export default VideoGrid
