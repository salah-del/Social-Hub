import React, { memo, useRef, useState } from "react";
import { Img } from "react-image";
import Skeleton from "react-loading-skeleton";
import { isValidUrl, isVideoURL } from "../../../../Utils/validateURLs";
import { IoMdAdd } from "react-icons/io";
import AddNewTagModal from "../../MainPage/EditVideo/AddNewTagModal";
import Loader from "../../../../Utils/Loader";
import { usePosts } from "../../../../Hooks/usePosts";

const UpdatePostModal = memo(({ setCloseModal, post }) => {
  const { editPost } = usePosts();
  const [updatePostLoading, setupdatePostLoading] = useState(false);

  const [imgUrl, setimgUrl] = useState("");
  const [addNewTagModal, setAddNewTagModal] = useState(false);

  const [inputs, setInputs] = useState({
    title: post.title,
    desc: post.desc,
    imgUrl: post.imgUrl,
    tags: post.tags,
  });
  console.log(inputs);

  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    imgUrl: "",
  });

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    // Update the input value
    setInputs({ ...inputs, [name]: value });

    // Handle changes specifically for imgUrl
    if (name === "imgUrl") {
      // Clear image URL and errors if the input is empty
      if (!value) {
        setimgUrl("");
        setErrors({ ...errors, [name]: "" });
        return;
      }

      // Validate the URL format
      if (!isValidUrl(value)) {
        setErrors({ ...errors, [name]: "Invalid URL format" });
        setimgUrl("");
        return;
      }

      // Check if it's a video URL
      if (isVideoURL(value)) {
        setErrors({ ...errors, [name]: "Appears to be a video link" });
        setimgUrl("");
        return;
      }

      // Validate if it's an image URL
      const img = new Image();
      img.onload = () => {
        setimgUrl(value); // Valid image
        setErrors({ ...errors, [name]: "" }); // Clear errors
      };
      img.onerror = () => {
        setErrors({ ...errors, [name]: "Invalid image URL" });
        setimgUrl("");
      };
      img.src = value; // Trigger image loading
    } else if (name === "title") {
      if (!value) {
        setErrors({ ...errors, [name]: "Enter a title" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "desc") {
      if (!value) {
        setErrors({ ...errors, [name]: "Enter a desc" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const focusOnImageInput = () => {
    if (imageRef && imageRef.current) {
      imageRef.current.focus();
    }
  };
  const focusOnTitleInput = () => {
    if (titleRef && titleRef.current) {
      titleRef.current.focus();
    }
  };
  const focusOnDescInput = () => {
    if (descRef && descRef.current) {
      descRef.current.focus();
    }
  };

  const isValidInputs = () => {
    let isValid = true;
    let errors = {
      title: "",
      desc: "",
      imgUrl: "",
    };
    if (!inputs.title) {
      errors.title = "Enter a title";
      isValid = false;
    }
    if (!inputs.desc) {
      errors.desc = "Enter a desc";
      isValid = false;
    }
    if (!inputs.imgUrl) {
      errors.imgUrl = "Enter Image Url";
      isValid = false;
    } else if (!isValidUrl(inputs.imgUrl)) {
      errors.imgUrl = "Invalid Image Url";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleUpdatePost = async () => {
    if (isValidInputs()) {
      setupdatePostLoading(true);
      const details = {
        title: inputs.title,
        imgUrl: inputs.imgUrl,
        desc: inputs.desc,
        tags: inputs.tags,
      };
      await editPost(post._id, details);
      setupdatePostLoading(false);
      setCloseModal(false);
    }
  };

  const handleOpenAddNewTag = () => {
    setAddNewTagModal(true);
  };
  const handleCloseAddNewTag = () => {
    setAddNewTagModal(false);
  };
  const handleAddNewTag = (tagName) => {
    setInputs({ ...inputs, tags: [...inputs.tags, tagName] });
  };
  const handleRemoveTag = (index) => {
    setInputs({ ...inputs, tags: inputs.tags.filter((_, i) => i !== index) });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* View image directly */}
      <div className="flex sm:max-w-full flex-col items-start gap-4">
        {/* Image */}
        {inputs.imgUrl && !errors.imgUrl ? (
          <Img
            src={inputs.imgUrl}
            className="max-w-full h-48 rounded-md"
            loader={
              <div className="w-full h-48 animate-pulse">
                <Skeleton height="100%" width="100%" borderRadius={"4px"} />
              </div>
            }
            onError={() => setimgUrl("")}
          />
        ) : (
          <div
            onClick={focusOnImageInput}
            className="w-full select-none cursor-pointer h-48 rounded-md bg-gray-200 flex items-center justify-center text-sm"
          >
            No image added. Click to add one.
          </div>
        )}
        <p
          onClick={focusOnTitleInput}
          className="text-sm select-none cursor-pointer ml-2 text-gray-600 text-start max-w-full text-wrap break-words"
        >
          {inputs.title ? inputs.title : "Add the post title right here"}
        </p>
        {/* Post tags */}
        {
          <div className="flex max-w-full text-wrap gap-1 ml-2 items-center">
            {inputs.tags && inputs.tags.length > 0 ? (
              <div className="flex max-w-full flex-wrap gap-1 items-center">
                {inputs.tags.map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => handleRemoveTag(index)}
                    className="p-2 text-xs cursor-pointer trans hover:bg-sec-color text-gray-600  bg-gray-50 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
                <button
                  onClick={handleOpenAddNewTag}
                  className="p-2 text-xs cursor-pointer trans hover:bg-gray-100 rounded-sm"
                >
                  <IoMdAdd className="text-lg text-main-color" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 flex-wrap">
                <span className="p-2 text-xs  text-gray-800 bg-gray-50 rounded-sm">
                  Not tags added
                </span>
                <button
                  onClick={handleOpenAddNewTag}
                  className="p-2 text-xs cursor-pointer trans hover:bg-gray-100 rounded-sm"
                >
                  <IoMdAdd className="text-lg text-main-color" />
                </button>
              </div>
            )}
          </div>
        }
        <div
          onClick={focusOnDescInput}
          className="select-none cursor-pointer ml-2 p-2 bg-gray-50 border  text-gray-600 w-full rounded-md flex items-center justify-start"
        >
          <p className="text-xs max-w-full text-start text-wrap break-words">
            {inputs.desc ? inputs.desc : "Add post desc"}
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        {/* Image */}
        <label className="flex flex-col items-start gap-1 cursor-pointer">
          <span className=" select-none text-sm font-medium w-full flex items-center justify-center text-gray-700">
            <p className="mr-auto">Image Url:</p>
            {errors.imgUrl && (
              <div className="text-xs p-1 rounded-sm bg-red-100 text-red-500 font-semibold">
                {errors.imgUrl}
              </div>
            )}
          </span>
          <input
            type="text"
            name="imgUrl"
            ref={imageRef}
            value={inputs.imgUrl}
            onChange={handleInputsChange}
            className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 focus:outline-gray-400`}
            placeholder="Enter Image Url"
          />
        </label>
        {/* Post title */}
        <label className="flex flex-col items-start gap-1 cursor-pointer">
          <span className=" select-none text-sm font-medium w-full flex items-center justify-center text-gray-700">
            <p className="mr-auto">Title:</p>
            {errors.title && (
              <div className="text-xs p-1 rounded-sm bg-red-100 text-red-500 font-semibold">
                {errors.title}
              </div>
            )}
          </span>
          <input
            type="text"
            name="title"
            ref={titleRef}
            value={inputs.title}
            onChange={handleInputsChange}
            className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 focus:outline-gray-400`}
            placeholder="Enter post title"
          />
        </label>
        {/* Post desc */}
        <label className="flex flex-col items-start gap-1 cursor-pointer">
          <span className=" select-none text-sm font-medium w-full flex items-center justify-center text-gray-700">
            <p className="mr-auto">description:</p>
            {errors.desc && (
              <div className="text-xs p-1 rounded-sm bg-red-100 text-red-500 font-semibold">
                {errors.desc}
              </div>
            )}
          </span>
          <textarea
            name="desc"
            ref={descRef}
            value={inputs.desc}
            onChange={handleInputsChange}
            className="w-full h-[75px] resize-none p-2 outline-1 border-2 rounded-md bg-gray-50 focus:outline-gray-400"
            placeholder="Enter Post Description"
          />
        </label>

        {!updatePostLoading && (
          <button
            onClick={handleUpdatePost}
            className="ml-auto text-sm bg-main-color mt-2 px-3 py-2 text-white trans hover:bg-sec-color rounded-md "
          >
            Update Post
          </button>
        )}
        {updatePostLoading && (
          <div className="ml-auto text-sm w-[89px] mt-2 flex items-center justify-center py-2 text-white  ">
            <Loader width={"24px"} />
          </div>
        )}
      </div>
      {addNewTagModal && (
        <AddNewTagModal
          handleAddNewTag={handleAddNewTag}
          handleCloseTagModal={handleCloseAddNewTag}
        />
      )}
    </div>
  );
});

export default UpdatePostModal;
