
// here we check if the user has logged in we will forward him to children 
// if he didn't log in we are gonna return hi to landing page 

import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.user.user)
    if (user)
        return children
    return <Navigate to="/login" replace />;
}

export default ProtectedRoute