import { Outlet } from "react-router-dom";

import HostHeader from "./HostHeader";

const HostLayout = () => {
    return (
        <div className="px-10">
            <HostHeader />
            <Outlet />
        </div>
    )
}

export default HostLayout