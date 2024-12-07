import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import NotFound from "./Pages/NotFound";
import LandingPageLayout from "./Pages/LandingPage/LandingPageLayout";
import Loader from "./Utils/Loader";
import { Toaster } from "react-hot-toast";

import MainPage from "./Pages/socialHub/MainPage";
import Trending from "./Pages/socialHub/Trending";
import Reports from "./Pages/socialHub/Reports";
import SocialHubLayout from "./Pages/socialHub/SocialHubLayout";
import Friends from "./Pages/socialHub/Friends";
import People from "./Pages/socialHub/People";
import MyCommunities from "./Pages/socialHub/MyCommunities";
import Plans from "./Pages/socialHub/Plans";
import MyFavourites from "./Pages/socialHub/SavedItems";
import MyMessages from "./Pages/socialHub/myMessages";
import SavedItems from "./Pages/socialHub/SavedItems";

const LandingPage = lazy(() => import("./Pages/LandingPage/LandingPage"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));

function App() {
  // get user from redux
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = user ? true : false; // if user has value (isAuth = true) else (isAuth = false)
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="w-full h-screen flex items-center justify-center">
                <Loader />
              </div>
            }
          >
            <Routes>
              {/* Start of landing page routes (landingPage, login, signUp) */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/mainPage" replace />
                  ) : (
                    <LandingPageLayout />
                  )
                }
              >
                <Route
                  index
                  element={
                    isAuthenticated ? (
                      <Navigate to="/mainPage" replace />
                    ) : (
                      <LandingPage />
                    )
                  }
                />
                <Route
                  path="/login"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/mainPage" replace />
                    ) : (
                      <Login />
                    )
                  }
                />
                <Route
                  path="/signup"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/mainPage" replace />
                    ) : (
                      <SignUp />
                    )
                  }
                />
              </Route>
              {/* End of landing page routes */}

              {/* Protected layout (main website) */}
              {/* <Route
                path="/mainPage"
                element={
                  isAuthenticated ? (
                    <MainPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              /> */}

              <Route path="/socialHub" element={<SocialHubLayout />}>
                <Route index element={<MainPage />} />
                <Route path="trending" element={<Trending />} />
                <Route path="friends" element={<Friends />} />
                <Route path="people" element={<People />} />
                <Route path="plans" element={<Plans />} />
                <Route path="myCommunities" element={<MyCommunities />} />
                <Route path="savedItems" element={<SavedItems />} />
                <Route path="myMessages" element={<MyMessages />} />
                <Route path="reports" element={<Reports />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Fallback for unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
