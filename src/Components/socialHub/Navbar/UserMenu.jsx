import { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <span className="text-gray-700 font-medium">John Doe</span>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <FaUserCircle className="w-6 h-6 text-gray-500" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FaCog className="w-4 h-4 mr-3" />
            Settings
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FaSignOutAlt className="w-4 h-4 mr-3" />
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;