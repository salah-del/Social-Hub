import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../Components/socialHub/Navbar/Navbar";
import Sidebar from "../../Components/socialHub/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function SocialHubLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className={`lg:ml-64 transition-all duration-300`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
}

export default SocialHubLayout;
