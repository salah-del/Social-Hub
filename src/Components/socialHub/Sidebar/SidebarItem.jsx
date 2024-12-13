import { forwardRef, memo } from "react";

const SidebarItem = memo(
  forwardRef(({ icon: Icon, text, onClick, isActive }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`
        flex items-center px-6 py-4 text-c-black 
        hover:bg-h-bg1 hover:text-c-black 
        transition-all duration-200 relative
        ${isActive ? "bg-h-bg1 text-gray-700" : ""}
      `}
      >
        <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-main-color" : ""}`} />
        <span className="font-medium">{text}</span>
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-main-color"></div>
        )}
      </div>
    );
  })
);

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
