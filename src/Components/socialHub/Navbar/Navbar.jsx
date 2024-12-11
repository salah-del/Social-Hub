import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import UserMenu from "./UserMenu";
import Notifications from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "../../../Redux/slices/userDataSlice";
import Skeleton from "react-loading-skeleton";
import Cookies from "js-cookie";
const Navbar = ({ toggleSidebar }) => {
  const userID = Cookies.get("userID");
  const dispatch = useDispatch();
  const { user, status, error, hasFetched } = useSelector(
    (state) => state.userData
  );
  console.log(user);
  useEffect(() => {
    // to fetch only once
    if (!hasFetched) {
      dispatch(fetchUserData(userID));
    }
  }, [dispatch]);

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
          <Notifications />
          {/* User Details */}
          {status === "loading" ? (
            <div className="flex items-center space-x-3">
              <Skeleton width={100} height={24} />
              <Skeleton circle width={40} height={40} />
            </div>
          ) : (
            <button className="flex items-center space-x-3 focus:outline-none">
              <span className="text-gray-700 font-medium">{user?.name}</span>
              <div className="w-10 h-10 rounded-full bg-main-color flex items-center justify-center">
                <FaUserCircle className="w-6 h-6 text-white" />
              </div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;