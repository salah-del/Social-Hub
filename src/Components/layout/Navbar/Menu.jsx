const Menu = () => {
    return (
        <div className="bg-white z-[1000] w-full flex items-center justify-center border-t shadow-md absolute top-full left-0 " id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium     md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
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
        </div>
    )
}

export default Menu