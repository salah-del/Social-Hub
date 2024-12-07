import { Outlet } from "react-router-dom"
import Navbar from "../../Components/LandingPage/Navbar/Navbar"

const LandingPageLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default LandingPageLayout