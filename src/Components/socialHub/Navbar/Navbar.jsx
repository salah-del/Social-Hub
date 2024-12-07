import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import UserMenu from "./UserMenu";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800 lg:hidden focus:outline-none"
          >
            <FaBars size={20} />
          </button>
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border-[1.5px] border-gray-300 focus:outline-none focus:border-main-color"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-gray-600 hover:text-gray-800 relative">
            <TbMessageCircle size={22} />
            <span className="absolute -top-1 -right-1 bg-main-color text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              7
            </span>
          </button>
          <button className="text-gray-600 hover:text-gray-800 relative">
            <FaBell size={20} />
            <span className="absolute -top-1 -right-1 bg-main-color text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
