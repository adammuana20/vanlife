import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Footer from "../../components/Footer";
import MainHeader from "./MainHeader";
import RentModal from "../../components/Modals/RentModal";
import SearchModal from "../../components/Modals/SearchModal";
import LoadingOverlay from "../../components/LoadingOverlay";

const Layout = () => {
    const navigation = useNavigation()
    const location = useLocation()

    const isHomePage = location.pathname === '/'

    return (
        <>
            <div className="min-h-screen flex flex-col relative">
            {navigation.state === 'submitting' && <LoadingOverlay />}
                <RentModal />
                <SearchModal />
                <div className="fixed w-full z-20 shadow-sm bg-light-orange px-5 md:px-10 ">
                    <div className="py-4 border-b-[1px] max-w-screen-2xl mx-auto">
                        <MainHeader />
                    </div>
                </div>
                <main className={` px-0 ${isHomePage ? 'pt-0' : 'lg:px-10 pt-[5.3rem]'} md:px-0`}>
                    <Outlet />
                </main>
                <Footer />
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Layout