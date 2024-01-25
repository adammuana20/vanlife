import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MainHeader from "./MainHeader";

const Layout = () => {
    return (
        <div className="site-wrapper">
            <MainHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout