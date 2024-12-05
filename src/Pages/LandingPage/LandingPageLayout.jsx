import { Outlet } from "react-router-dom"
import Navbar from "../../Components/layout/Navbar/Navbar"

const LandingPageLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default LandingPageLayout