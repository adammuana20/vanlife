import React from "react"
import { Await, useLoaderData } from "react-router-dom"

import Welcome from "./Welcome"
import HostDashboardVansPreview from "../HostDashboardVansPreview"
import SkeletonHostDashboard from "../../Skeletons/Host/SkeletonHostDashboard"

import { Van } from "../../../utils/firebase"

const Dashboard = () => {
    const { vans } = useLoaderData() as { vans: Van[] }

    return (
        <React.Suspense fallback={<SkeletonHostDashboard />}>
            <Await resolve={vans}>
                <Welcome />
                <HostDashboardVansPreview />
            </Await>
        </React.Suspense>
    )
}

export default Dashboard;