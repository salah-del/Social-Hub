import { useState, useCallback, lazy, Suspense, useEffect } from "react";
import Navbar from "../../Components/socialHub/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import BonusCoinsButton from "../../Components/socialHub/BonusCoinsButton";
const Sidebar = lazy(() =>
  import("../../Components/socialHub/Sidebar/Sidebar")
);

const PersistentLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-c-bg2 overflow-x-hidden">
      <Suspense>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </Suspense>
      <div className={`lg:ml-[225px]`}>
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`lg:ml-[225px] transition-all duration-300 p-6 overflow-y-hidden`}
      >
        {children}
      </div>
      {
        // <BonusCoinsButton />
      }
    </div>
  );
};

export default PersistentLayout;
