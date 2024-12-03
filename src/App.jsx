import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import React, { lazy, Suspense } from "react";
import Loader from "./utils/Loader";

const MainPage = lazy(() => import('./Pages/MainPage') );
const About = lazy(() => import('./Pages/About') );

const routes = [
  {path:'/', element: <MainPage />, loader: <div className="w-full h-screen flex items-center justify-center"><Loader /></div>},
  {path:'/about', element: <About />, loader: <div className="w-full h-screen flex items-center justify-center"><Loader /></div>}
]


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
            <Routes>
              {
                routes.map(({ path, element ,loader}) => (
                    <Route key={path} path={path} element={
                      <Suspense fallback={loader}>
                        {element}
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
