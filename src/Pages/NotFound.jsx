import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { memo } from "react";

const NotFound = memo(({isAuth}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <Link
          to={isAuth ? "/socialHub" : "/"}
          className="inline-flex items-center px-6 py-3 bg-sec-color hover:bg-main-color  text-white rounded-lg  transition-colors"
        >
          <FaHome className="mr-2" />
            Back to {isAuth ? "Main Page" : "Home"}
        </Link>
      </div>
    </div>
  );
});

export default NotFound;
