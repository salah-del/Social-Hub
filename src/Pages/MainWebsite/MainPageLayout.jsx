import { NavLink, Outlet } from "react-router-dom"

const MainPageLayout = () => {
    return (
        <div className="h-full ">
            <div className="grid grid-cols-2 h-full">
                {/* Sidebar */}
                <div className="w-1/3 h-screen bg-main-color  flex flex-col p-10 ">
                    <NavLink to={'trends'} className={`w-fit`}>
                        Trends
                    </NavLink>
                    <NavLink to={'/history'} className={`w-fit`}>
                        History
                    </NavLink>
                </div>

                {/* content */}
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainPageLayout