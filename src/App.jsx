import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { lazy, Suspense } from "react";
import Loader from "./utils/Loader";
import Navbar from "./Components/layout/Navbar/Navbar";
import Footer from "./Components/layout/Footer";
import MainPage from "./Pages/MainPage";
import ProtectedRoute from "./Pages/ProtectedRoute";

const LandingPage = lazy(() => import('./Pages/LandingPage') );
const About = lazy(() => import('./Pages/About') );
const Login = lazy(() => import('./Pages/Login') );
const SignUp = lazy(() => import('./Pages/SignUp') );


const routes = [
  {path:'/', element: <LandingPage />, isProtected: false,loader: <div className="w-full h-screen flex items-center justify-center"><Loader /></div>},
  {path:'/login', element: <Login />, isProtected: false,loader: <div className="w-full h-screen flex items-center justify-center"><Loader /></div>},
  {path:'/signup', element: <SignUp />, isProtected: false,loader: <div className="w-full h-screen flex items-center justify-center"><Loader /></div>},
  {path:'*', element: <h1>Not Found</h1>, isProtected: false,loader: <div className="w-full h-screen flex items-center justify-center"><Loader /></div>},
  {path:'/about', element: <About />, isProtected: true,loader: <div className="w-full h-screen flex items-center justify-center"><Loader /></div>},
  {path:'/mainPage', element: <MainPage />, isProtected: true,loader: <div className="w-full h-screen flex items-center justify-center"><Loader /></div>},
]


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
            <Routes>
              {
                routes.map(({ path, element, isProtected ,loader}) => (
                    <Route key={path} path={path} element={
                      
                      <Suspense fallback={loader}>
                        {isProtected ? element : <ProtectedRoute>{element}</ProtectedRoute>}
                      </Suspense>
                    } />
                  ))
              }
            </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
