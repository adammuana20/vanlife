import React from "react"
import { defer, Await, useLoaderData } from "react-router-dom"
import { User } from "firebase/auth"

import Welcome from "./Welcome"
import HostDashboardVansPreview from "../HostDashboardVansPreview"
import Loading from "../../Loading"

import { Van, getHostVans } from "../../../utils/firebase"
import { requireAuth } from "../../../utils/loaders"


export const loader = (currentUser: User | null) => async({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)
    return defer({ vans: getHostVans() })
}

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