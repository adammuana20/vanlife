import { Outlet } from "react-router-dom";

import HostHeader from "./HostHeader";

const HostLayout = () => {
    return (
        <>
            <HostHeader />
            <Outlet />
        </>
    )
}

export default HostLayout