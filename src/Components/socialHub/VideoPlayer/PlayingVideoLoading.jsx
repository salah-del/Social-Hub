import React from 'react'
import Skeleton from 'react-loading-skeleton'

const PlayingVideoLoading = () => {
    return (
        <div className='w-full  flex flex-col gap-4'>
            
            <div className='w-full lg:h-[450px] xl:h-[500px]'>
                <Skeleton height="100%" width="100%" />
            </div>
            <Skeleton width={500} height={20} />
            <Skeleton width={250} height={40} />

            <Skeleton width={"100%"} height={100} />
        </div>
    )
}

export default PlayingVideoLoading