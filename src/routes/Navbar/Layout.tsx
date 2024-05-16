import { Outlet, useNavigation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Footer from "../../components/Footer";
import MainHeader from "./MainHeader";
import RentModal from "../../components/Modals/RentModal";
import SearchModal from "../../components/Modals/SearchModal";
import LoadingOverlay from "../../components/LoadingOverlay";

const Layout = () => {
    const navigation = useNavigation()

    return (
        <>
            <div className="min-h-screen flex flex-col relative">
            {navigation.state === 'submitting' && <LoadingOverlay />}
                <RentModal />
                <SearchModal />
                <div className="fixed w-full z-20 shadow-sm bg-light-orange px-5 md:px-10">
                    <div className="py-4 border-b-[1px]">
                        <MainHeader />
                    </div>
                </div>
                <main className="pt-28 px-0 lg:px-10 md:px-0">
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