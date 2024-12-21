import React, { useCallback, useRef, useState } from 'react'
import { Img } from 'react-image';
import Skeleton from 'react-loading-skeleton';

const AddNewVideoModal = () => {
  const [imgURL, setimgURL] = useState("");
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    videoURL: "",
    thumbnailURL: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    videoURL: "",
    thumbnailURL: "",
  });

  const isVideoURL = (url) => {
    const videoPlatforms = [/youtube\.com/, /vimeo\.com/];
    return videoPlatforms.some((pattern) => pattern.test(url));
  };

  const handleInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    if (e.target.name == "thumbnailURL") { 
      if (!e.target.value) 
        setimgURL("")
      const value = e.target.value;
      if (isValidUrl(value)) {
        if (isVideoURL(value)) {
          // Handle video URL (e.g., YouTube playlist or video link)
          console.log("This is a video URL, not an image.");
          setimgURL("");
        } else {
          // Validate if it's an image
          const img = new Image();
          img.onload = () => setimgURL(value); // Valid image
          img.onerror = () => setimgURL(""); // Invalid image
          img.src = value;
        }
      } else {
        setimgURL("");
      }
    }
  };
  const thumbnailRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const focusOnDescInput = () => { 
    if (descRef && descRef.current){
      descRef.current.focus();
    }
  }
  const focusOnTitleInput = () => { 
    if (titleRef && titleRef.current){
      titleRef.current.focus();
    }
  }
  const focusOnThumbnailInput = () => { 
    if (thumbnailRef && thumbnailRef.current){
      thumbnailRef.current.focus();
    }
  }

  const isValidUrl = (url) => {
    try {
      new URL(url); // Checks if the URL is valid
      return true;
    } catch (error) {
      return false;
    }
  };

  const isValidInputs = () => { 
    let isValid = true;
    let errors = {
      title: "",
      description: "",
      videoURL: "",
      thumbnailURL: "",
    };
    if (!inputs.title) { 
      errors.title = "Enter Title"
      isValid = false;
    }
    if (!inputs.description) { 
      errors.description = "Enter description"
      isValid = false;
    }
    if (!inputs.videoURL) { 
      errors.videoURL = "Enter video URL"
      isValid = false;
    }
    else if (!isValidUrl(inputs.videoURL)) {
      errors.videoURL = "Invalid Video URL"
      isValid = false;
    }
    if (!inputs.thumbnailURL) { 
      errors.thumbnailURL = "Enter thumbnail URL"
      isValid = false;
    }
    else if (!isValidUrl(inputs.thumbnailURL)) {
      errors.thumbnailURL = "Invalid thumbnail URL"
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  }

  const handleAddVideo = () => { 
    if(isValidInputs()) { 
      // handle add video 
    }
  }

  return (
    <div className='grid md:grid-cols-2 gap-8'>
      {/* Live seeing  */}
      <div className='flex sm:max-w-full flex-col items-start gap-4'>
        {/* Image */}
        {
          (imgURL && !errors.thumbnailURL) 
          ? <Img src={inputs.thumbnailURL} className='max-w-full h-48 rounded-md'loader={
              <div className="w-full h-48 animate-pulse">
                <Skeleton height="100%" width="100%" borderRadius={"4px"} />
              </div>
            } onError={() => setimgURL("")} /> : <div onClick={focusOnThumbnailInput} className='w-full select-none cursor-pointer h-48 rounded-md bg-gray-200 flex items-center justify-center text-sm' >Add Video Thumbnail</div> 
        }
        <p onClick={focusOnTitleInput} className='text-xs select-none cursor-pointer ml-2 text-gray-600 text-start max-w-full text-wrap break-words'>{inputs.title ? inputs.title : "Add the video title right here" }</p>
        <div onClick={focusOnDescInput} className='select-none cursor-pointer ml-2 p-2 bg-gray-50 border  text-gray-600 w-full rounded-md flex items-center justify-start'>
          <p className='text-xs max-w-full text-start text-wrap break-words'>{inputs.description ? inputs.description :"Add video description"}</p>
        </div>
      </div>

      {/* Inputs */}
      <div className='flex flex-col gap-4'>
        {/* Video URL */}
        <label className='flex flex-col items-start gap-1 cursor-pointer'>
          <span className=' select-none text-sm font-medium w-full flex items-center justify-center text-gray-700'>
            <p className='mr-auto'>Video URL:</p>
            {errors.videoURL && <div className='text-xs p-1 rounded-sm bg-red-100 text-red-500 font-semibold'>{errors.videoURL}</div>}
          </span>
          <input 
            type='text' 
            name='videoURL'
            value={inputs.videoURL}
            onChange={handleInputsChange}
            className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 focus:outline-gray-400`}
            placeholder="Enter video video URL" 
          />

        </label>
        {/* Video title */}
        <label className='flex flex-col items-start gap-1 cursor-pointer'>
          <span className=' select-none text-sm font-medium w-full flex items-center justify-center text-gray-700'>
            <p className='mr-auto'>Title:</p>
            {errors.title && <div className='text-xs p-1 rounded-sm bg-red-100 text-red-500 font-semibold'>{errors.title}</div>}
          </span>
          <input 
            type='text' 
            name='title'
            ref={titleRef}
            value={inputs.title}
            onChange={handleInputsChange}
            className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 focus:outline-gray-400`}
            placeholder="Enter video title" 
          />

        </label>
        {/* Video desc */}
        <label className='flex flex-col items-start gap-1 cursor-pointer'>
          <span className=' select-none text-sm font-medium w-full flex items-center justify-center text-gray-700'>
            <p className='mr-auto'>Description:</p>
            {errors.description && <div className='text-xs p-1 rounded-sm bg-red-100 text-red-500 font-semibold'>{errors.description}</div>}
          </span>
          <input 
            type='text' 
            name='description'
            ref={descRef}
            value={inputs.description}
            onChange={handleInputsChange}
            className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 focus:outline-gray-400`}
            placeholder="Enter video description" 
          />

        </label>

        {/* Thumbnail */}
        <label className='flex flex-col items-start gap-1 cursor-pointer'>
          <span className=' select-none text-sm font-medium w-full flex items-center justify-center text-gray-700'>
            <p className='mr-auto'>Thumbnail URL:</p>
            {errors.thumbnailURL && <div className='text-xs p-1 rounded-sm bg-red-100 text-red-500 font-semibold'>{errors.thumbnailURL}</div>}
          </span>
          <input 
            type='text' 
            name='thumbnailURL'
            ref={thumbnailRef}
            value={inputs.thumbnailURL}
            onChange={handleInputsChange}
            className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 focus:outline-gray-400`}
            placeholder="Enter thumbnail URL" 
          />

        </label>
        <button onClick={handleAddVideo} className="ml-auto text-sm bg-main-color px-3 py-2 text-white trans hover:bg-sec-color rounded-md ">
            Add Video
        </button>
      </div>
    </div>
  )
}

export default AddNewVideoModal