import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import MainHeader from "./MainHeader";
import RentModal from "../../components/Modals/RentModal";
import SearchModal from "../../components/Modals/SearchModal";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <RentModal />
            <SearchModal />
            <div className="fixed w-full z-20 shadow-sm bg-light-orange px-10">
                <div className="py-4 border-b-[1px]">
                    <MainHeader />
                </div>
            </div>
            <main className="pt-28 px-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout