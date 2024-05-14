import { Outlet } from "react-router-dom";

import HostHeader from "./HostHeader";

const HostLayout = () => {
    return (
        <div className="px-5 md:px-10 max-w-screen-2xl mx-auto">
            <HostHeader />
            <Outlet />
        </div>
    )
}

export default HostLayout