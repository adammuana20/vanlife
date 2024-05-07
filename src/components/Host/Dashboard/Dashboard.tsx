import React from "react"
import { defer, Await, useLoaderData } from "react-router-dom"
import { User } from "firebase/auth"

import Welcome from "./Welcome"
import HostDashboardVansPreview from "../HostDashboardVansPreview"

import { Van, getHostVans } from "../../../utils/firebase"
import { requireAuth } from "../../../utils/loaders"


export const loader = (currentUser: User | null) => async({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)
    return defer({ vans: getHostVans() })
}

const Dashboard = () => {
    const { vans } = useLoaderData() as { vans: Van[] }

    return (
        <React.Suspense fallback={<h3>Loading...</h3>}>
            <Await resolve={vans}>
                <Welcome />
                {/* <Rating /> */}
                <HostDashboardVansPreview />
            </Await>
        </React.Suspense>
    )
}

export default Dashboard;