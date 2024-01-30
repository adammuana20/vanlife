import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MainHeader from "./MainHeader";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <MainHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout