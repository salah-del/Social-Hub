
// here we check if the user has logged in we will forward him to children 
// if he didn't log in we are gonna return hi to landing page 

import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../Utils/Loader";

const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? 
            // <Suspense
            //     fallback={
            //     <div className="ml-0 lg:ml-64 mt-[75px] h-[calc(100vh-75px)]  flex items-center justify-center">
            //         <Loader />
            //     </div>
            //     }
            //     >
                children
            // </Suspense>
            : <Navigate to="/" replace />;
};

export default ProtectedRoute