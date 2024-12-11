import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaSignOutAlt,
  FaClipboard,
  FaUserFriends,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";
import { RiCommunityLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import { useDispatch } from "react-redux";
import sweetalert from './../../../Utils/sweetalert';
import { logUserOut } from "../../../Redux/slices/userSlice";
import React from "react";

const Sidebar = React.memo(({ isOpen, onClose }) => {
  const location = useLocation();

  const dispatch = useDispatch();
  const handleLogout = async () => { 
      const result = await sweetalert.logout();
      if (result.isConfirmed)
          dispatch(logUserOut())
  }

  const menuItems = [
    { icon: FaHome, text: "Main Page", path: "/socialHub", scr: "/socialHub" },
    {
      icon: FaArrowTrendUp,
      text: "Trending",
      path: "trending",
      scr: "/socialHub/trending",
    },
    {
      icon: FaUserFriends,
      text: "Friends",
      path: "friends",
      scr: "/socialHub/friends",
    },
    {
      icon: FaUsers,
      text: "People",
      path: "people",
      scr: "/socialHub/people",
    },
    {
      icon: BiSolidCategoryAlt,
      text: "Plans",
      path: "plans",
      scr: "/socialHub/plans",
    },
    {
      icon: RiCommunityLine,
      text: "Communities",
      path: "myCommunities",
      scr: "/socialHub/myCommunities",
    },
    {
      icon: FaRegSave,
      text: "Saved Items",
      path: "savedItems",
      scr: "/socialHub/savedItems",
    },
    {
      icon: TbMessages,
      text: "My Messages",
      path: "myMessages",
      scr: "/socialHub/myMessages",
    },
    {
      icon: FaClipboard,
      text: "Reports",
      path: "reports",
      scr: "/socialHub/reports",
    },
  ];

  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300
          lg:hidden ${
            isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
          }
        `}
      />
      <div
        className={`
        fixed top-0 left-0 h-full bg-gray-800 text-white w-64 
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <SidebarHeader onClose={onClose} />

        <nav className="mt-6">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.text} to={item.path}>
                <SidebarItem
                  icon={item.icon}
                  text={item.text}
                  isActive={location.pathname === item.scr}
                />
              </Link>
            ))}
          </div>

          <button onClick={handleLogout} className="absolute bottom-0 w-full border-t border-gray-700 p-4 cursor-pointer">
            <SidebarItem
              icon={FaSignOutAlt}
              text="Logout"
              
            />
          </button>
        </nav>
      </div>
    </>
  );
}
);

export default Sidebar;
