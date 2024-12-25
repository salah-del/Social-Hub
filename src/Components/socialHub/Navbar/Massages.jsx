import { TbMessageCircle } from "react-icons/tb";
const Massages = () => {
  return (
    <button className="text-gray-600 hover:text-gray-800 relative max-sm:mt-1 mt-2">
      <TbMessageCircle size={22} />
      <span className="absolute -top-1 -right-1 bg-main-color text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        7
      </span>
    </button>
  );
};

export default Massages;
