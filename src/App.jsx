import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Footer from "./Components/layout/Footer";
import LandingPageLayout from "./Pages/LandingPage/LandingPageLayout";
import Loader from "./Utils/Loader";
import toast, { Toaster } from "react-hot-toast";
const LandingPage = lazy(() => import("./Pages/LandingPage/LandingPage"));
const About = lazy(() => import("./Pages/About"));
const Login = lazy(() => import("./Pages/LandingPage/Login"));
const SignUp = lazy(() => import("./Pages/LandingPage/SignUp"));
const MainPage = lazy(() => import("./Pages/MainPage"));

function App() {
  const handleClick = () => {
    toast.success("تم النقر على الزر بنجاح!");
  };
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
              {/* Redirect to MainPage if already logged in */}
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

              {/* Public routes */}

              {/* Protected route */}
              <Route
                path="/mainPage"
                element={
                  isAuthenticated ? (
                    <MainPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              {/* Fallback for unknown routes */}
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <button onClick={handleClick}>اضغط هنا</button>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
