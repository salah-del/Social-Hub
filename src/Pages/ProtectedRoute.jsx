
// here we check if the user has logged in we will forward him to children 
// if he didn't log in we are gonna return hi to landing page 

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute