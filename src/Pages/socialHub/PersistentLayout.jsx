import { useState, useCallback, lazy, Suspense, useEffect } from "react";
import Navbar from "../../Components/socialHub/Navbar/Navbar";
import { useLocation } from "react-router-dom";
const Sidebar = lazy(() => import("../../Components/socialHub/Sidebar/Sidebar"))
    
const PersistentLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(!isSidebarOpen);
    }, [isSidebarOpen]);

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <Suspense fallback={<div className="h-screen w-64 bg-gray-800 animate-pulse " />}>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            </Suspense>
            <div className={`lg:ml-64`}>
                <Navbar toggleSidebar={toggleSidebar} />
            </div>
            <div className={`lg:ml-64 transition-all duration-300 p-6 overflow-y-hidden`}>
                {children}
            </div>
        </div>
    );
};

export default PersistentLayout;
