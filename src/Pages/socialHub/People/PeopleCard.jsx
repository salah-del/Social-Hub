import { FaUserPlus } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";

import { SlUserFollowing } from "react-icons/sl";
import { BsPersonCheckFill } from "react-icons/bs";
import profile from "../../../assets/profile.jpg";
import { Link } from "react-router-dom";
const PeopleCard = ({ person }) => {
  return (
    <div className="flex items-center max-[540px]:flex-col max-[540px]:gap-2 p-5 bg-gray-100 shadow border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200">
      {/* صورة المستخدم */}
      <Link to={`/socialHub/profile/${person._id}`}>
        <img
          src={person.profilePicture || profile}
          alt={person.name}
          className="w-[96px] h-[96px] rounded-full "
        />
      </Link>

      {/* بيانات المستخدم */}
      <Link
        to={`/socialHub/profile/${person._id}`}
        className="ml-4 flex-1 space-y-1"
      >
        <h2 className="text-xl font-bold text-gray-800">{person.name}</h2>
        <p className="text-sm text-gray-600">
          {person.mutualFriends || 0} mutual friends
        </p>
      </Link>

      {/* أزرار الإجراءات */}
      <div className="ml-4 flex flex-col max-[540px]:flex-row max-[365px]:flex-col items-end gap-2">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition">
          <SlUserFollow className="mr-2" />
          Follow
        </button>
        <button className="px-2 py-2 bg-gray-400 text-white rounded-lg flex items-center hover:bg-gray-500 transition">
          <FaUserPlus className="mr-2" />
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default PeopleCard;
