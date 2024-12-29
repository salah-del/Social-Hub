import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FaUser, FaBan, FaFlag } from "react-icons/fa";
import { useRef } from "react";
export default function FriendMenu() {
  const menuRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={menuRef}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaEllipsisV size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul>
            <li
              className="flex items-center px-4 py-2 rounded-lg  text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={handleCloseMenu}
            >
              <FaUser size={16} className="mr-2" />
              View Profile
            </li>
            <li
              className="flex items-center px-4 py-2 text-gray-700  hover:bg-gray-100 cursor-pointer"
              onClick={handleCloseMenu}
            >
              <FaBan size={16} className="mr-2" />
              Block
            </li>
            <li
              className="flex items-center px-4 py-2 rounded-lg  text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={handleCloseMenu}
            >
              <FaFlag size={16} className="mr-2" />
              Report
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
