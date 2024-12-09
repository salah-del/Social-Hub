import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../Utils/Loader";

const PublicRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? <Navigate to="/socialHub" replace /> : 
            // <Suspense
            //     fallback={
            //     <div className="w-full h-screen flex items-center justify-center">
            //         <Loader />
            //     </div>
            //     }
            //     >
                children
            // </Suspense>;
};

export default PublicRoute