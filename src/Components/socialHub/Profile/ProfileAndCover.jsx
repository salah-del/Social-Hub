import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cover from "../../../assets/cover.png";
import profile from "../../../assets/profile.jpg";
import LazyImage from "../../../Utils/LazyImage";
import CoverPicture from "./Update/CoverPicture";
import ProfilePicture from "./Update/ProfilePicture";
const ProfileAndCover = ({ user, status, edit }) => {
  return (
    <div>
      {/* Cover Image */}
      <div className="relative group">
        {status === "loading" ? (
          <Skeleton height={155} />
        ) : (
          <img
            src={user?.coverPicture || cover}
            alt="Something Wrong With Cover Picture"
            className="w-full h-[155px] object-cover"
          />
        )}
        {status === "succeeded" && edit && <CoverPicture user={user} />}
      </div>

      {/* Profile Image */}
      <div className="relative group flex float-end">
        {status === "loading" ? (
          <div className="mr-5 -mt-[60px] ">
            <Skeleton circle height={105} width={105} />
          </div>
        ) : (
          <LazyImage
            src={user?.profilePicture || profile}
            alt="profile"
            className="mr-5 Cover Picture -mt-11 w-20 h-20 sm:-mt-12 sm:w-[105px] sm:h-[105px] lg:w-36 lg:h-36 lg:-mt-20 rounded-full border-2 border-gray-300"
            loader={<Skeleton circle height={105} width={105} />}
          />
        )}
        {status === "succeeded" && edit && <ProfilePicture user={user} />}
      </div>
    </div>
  );
};

export default ProfileAndCover;
