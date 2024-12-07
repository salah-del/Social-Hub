import { useState } from "react";
import { Img } from "react-image";
import { Link } from "react-router-dom";
import logo from "../../../assets/socialHub 1.svg";
import Menu from "./Menu";
import LazyImage from "../../../Utils/LazyImage";

const  Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = () => setOpenMenu(prev => !prev) ; 

  return (
      <nav className=" w-full z-20  start-0  border-gray-200 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          
          <Link to="/">
              <LazyImage src={logo} className="w-24 min-[400px]:w-28" alt="socialhub Logo"  loader={<div className="w-24 min-[400px]:w-28 h-[30px] min-[400px]:h-[35px]  bg-gray-100 animate-pulse" />}/>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <Link to={'/signup'} type="button" className="text-main-color  border-main-color  border bg-white hover:bg-gray-50 font-medium rounded-md  px-2 min-[400px]:px-4 py-2 md:mr-3 text-center text-sm  trans">Sign up</Link>
              <Link to={'/login'} type="button" className="text-white bg-main-color font-medium rounded-md  px-2 min-[400px]:px-4 py-2 text-center text-sm hover:bg-sec-color trans">Login</Link>
              {/* <button onClick={toggleMenu} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100 " aria-controls="navbar-sticky" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                  </svg>
              </button> */}
          </div>

          {/* Pages */}
          {/* <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border    md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <button className="block py-2 px-3 trans  text-gray-600 hover:text-gray-900   rounded md:bg-transparent   md:p-0 ">Home</button>
              </li>
              <li>
                <button className="block py-2 px-3 trans text-gray-600 hover:text-gray-900 rounded md:p-0 ">About</button>
              </li>
              <li>
                <button className="block py-2 px-3 trans text-gray-600 hover:text-gray-900 rounded md:p-0 ">Services</button>
              </li>
              <li>
                <button className="block py-2 px-3 trans text-gray-600 hover:text-gray-900 rounded md:p-0 ">Contact</button>
              </li>
            </ul>
          </div> */}
          
        </div>

        {/* {openMenu && <Menu />} */}
      </nav>
  );
}

export default Navbar;