import { useEffect, useState } from "react";
import { FaTable, FaBookmark, FaUserFriends } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { Link } from "react-router-dom";
const Tabs = ({openTab, id}) => {
  const [activeTab, setActiveTab] = useState(openTab || "posts");
  useEffect(() => { 
    setActiveTab(openTab || "posts")
  }, [openTab,id]);
  const tabs = [
    { id: "posts", to: "", name: "POSTS", icon: <FaTable size={16} /> },
    { id: "videos", to: "videos", name: "VIDEOS", icon: <BiSolidVideos size={18} /> },
    { id: "friends", to: "friends" , name: "FRIENDS", icon: <FaUserFriends size={18} /> },
    { id: "saved", to: "saved", name: "SAVED", icon: <FaBookmark size={15} /> },
  ];
  return (
    <div>
      <div className="w-full mt-4 border-t-2 border-gray-200">
        <div className="flex justify-center items-center gap-7 text-gray-500 uppercase text-sm -mt-[1.5px]">
          {tabs.map((tab) => (
            <Link
              to={tab.to}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 cursor-pointer py-3 ${
                activeTab === tab.id
                  ? "text-c-black border-t-2 border-c-black"
                  : "hover:text-gray-700"
              }`}
            >
              {tab.icon}
              <span className="max-[385px]:hidden">{tab.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
