import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cover from "../../../assets/cover.png";
import profile from "../../../assets/profile.jpg";
import LazyImage from "../../../Utils/LazyImage";
import { FaCamera, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProfileAndCover = ({ user, status, loading }) => {
  return (
    <div>
      {/* Cover Image */}
      <div className="relative group">
        {status === "loading" || loading ? (
          <Skeleton height={155} />
        ) : (
          <LazyImage
            src={user?.coverPicture || cover}
            alt="cover"
            className="w-full max-h-[155px] object-cover"
          />
        )}
        {!loading && (
          <Link
            to=""
            className="opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-2 p-3 bg-black bg-opacity-50 text-white rounded-full absolute -bottom-1 left-14 transform -translate-x-1/2 -translate-y-1/2 max-sm:text-sm max-sm:p-1.5 max-sm:left-10"
          >
            Edit
            <FaCamera />
          </Link>
        )}
      </div>
      {/* Profile Image */}
      <div className="relative group flex float-end">
        {status === "loading" || loading ? (
          <div className="mr-5 -mt-[60px] ">
            <Skeleton circle height={105} width={105} />
          </div>
        ) : (
          <LazyImage
            src={user?.profilePicture || profile}
            alt="profile"
            className="mr-5 -mt-11 w-20 h-20 sm:-mt-12 sm:w-[105px] sm:h-[105px] lg:w-36 lg:h-36 lg:-mt-20 rounded-full border-2 border-gray-300"
          />
        )}
        {!loading && (
          <Link to="" className="">
            <FaUserEdit className=" opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 rounded-full p-1 m-1   absolute top-1/2 right-1/3 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl " />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileAndCover;
