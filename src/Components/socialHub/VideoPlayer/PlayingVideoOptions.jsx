import React, { memo } from 'react'
import { copyURL } from '../../../Utils/copyURL'

const PlayingVideoOptions = memo(({videoURL}) => {


    const handleCopyVideoUrl = () => { 
        copyURL(videoURL)
    }
    return (
        <div className='flex gap-2'>
            <button className='flex text-xs  items-center border sm:text-sm gap-0.5 px-1.5 sm:px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 trans'>
                Save Video
            </button>

            <button onClick={handleCopyVideoUrl} className='flex  text-xs items-center border sm:text-sm gap-0.5 px-1.5 sm:px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 trans'>
                Copy URL
            </button>
        </div>
    )
})

export default PlayingVideoOptions;