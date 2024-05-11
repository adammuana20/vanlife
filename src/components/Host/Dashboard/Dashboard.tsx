import React from "react"
import { Await, useLoaderData } from "react-router-dom"

import Welcome from "./Welcome"
import HostDashboardVansPreview from "../HostDashboardVansPreview"
import Loading from "../../Loading"

import { Van } from "../../../utils/firebase"

const Dashboard = () => {
    const { vans } = useLoaderData() as { vans: Van[] }

    return (
        <React.Suspense fallback={<Loading />}>
            <Await resolve={vans}>
                <Welcome />
                <HostDashboardVansPreview />
            </Await>
        </React.Suspense>
    )
}

export default Dashboard;