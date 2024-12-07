import { FaTimes } from "react-icons/fa";
import logo from "../../../assets/socialHub 1.svg";
import LazyImage from "../../../Utils/LazyImage";
const SidebarHeader = ({ onClose }) => {
  return (
    <div className="p-[20.7px] flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-main-color rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <h2 className="text-xl font-bold text-white">Social Hub</h2>
      </div>
      {/*  <div className="flex items-center space-x-2">
    <LazyImage src={logo} alt="Logo" className="w-24" />
    </div>*/}
      <button
        onClick={onClose}
        className="lg:hidden text-gray-400 hover:text-white transition-colors"
      >
        <FaTimes size={20} />
      </button>
    </div>
  );
};

export default SidebarHeader;
