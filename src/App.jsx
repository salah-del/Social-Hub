import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import LandingPageLayout from "./Pages/LandingPage/LandingPageLayout";
import SocialHubLayout from "./Pages/socialHub/SocialHubLayout";
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./Pages/ProtectedRoute";
import PublicRoute from "./Pages/PublicRoute";
import Loader from "./Utils/Loader";
import Skeleton from "react-loading-skeleton";

// lazy loading for components
const LandingPage = lazy(() => import("./Pages/LandingPage/LandingPage"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const Friends =  lazy(() => import ("./Pages/socialHub/Friends"));
const MainPage =  lazy(() => import ("./Pages/socialHub/MainPage"));
const MyCommunities =  lazy(() => import ("./Pages/socialHub/MyCommunities"));
const MyMessages =  lazy(() => import ("./Pages/socialHub/myMessages"));
const People =  lazy(() => import ("./Pages/socialHub/People"));
const Plans =  lazy(() => import ("./Pages/socialHub/Plans"));
const Reports =  lazy(() => import ("./Pages/socialHub/Reports"));
const SavedItems =  lazy(() => import ("./Pages/socialHub/SavedItems"));
const Trending =  lazy(() => import ("./Pages/socialHub/Trending"));



function App() {
  
  const userID = Cookies.get("userID");
  const isAuthenticated = Boolean(userID); // if user has value (isAuth = true) else (isAuth = false)
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Suspense fallback={ !isAuthenticated ? 
                <div className={` w-full h-screen flex items-center justify-center`}>
                    <Loader />
                </div>
                : <div className={` w-full lg:ml-64 lg:w-[calc(100%-256px)] h-[calc(100vh-75px)] translate-y-[75px]  flex items-center justify-center`}>
                    <Loader />
                </div>
                }>
          
          <Routes>
          
            {/* Start of landing page routes (landingPage, login, signUp) */}
            <Route
              path="/"
              element={<PublicRoute isAuthenticated={isAuthenticated}><LandingPageLayout /></PublicRoute>
              }
            >
              <Route index element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            {/* End of landing page routes */}
          
            {/* Protected layout (main website) */}
          
            <Route
              path="/socialHub"
              element={<ProtectedRoute isAuthenticated={isAuthenticated}><SocialHubLayout /></ProtectedRoute>
              }
            >
              <Route index element={<MainPage />} />
              <Route path="trending" element={<Trending />} />
              <Route path="friends" element={<Friends />} />
              <Route path="people" element={<People />} />
              <Route path="plans" element={<Plans />} />
              <Route path="myCommunities" element={<MyCommunities />} />
              <Route path="savedItems" element={<SavedItems />} />
              <Route path="myMessages" element={<MyMessages />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          
            <Route path="*" element={<NotFound isAuth={isAuthenticated} />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
