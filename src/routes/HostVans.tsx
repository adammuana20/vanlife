import React from "react"
import { useLoaderData, defer, Await, LoaderFunctionArgs } from "react-router-dom"
import { User } from "firebase/auth"

import { Van, getHostVans } from "../utils/firebase"
import { requireAuth } from "../utils/loaders"
import HostVansPreview from "../components/Host/HostVansPreview"


export const loader = (currentUser: User | null) => async({ request }: LoaderFunctionArgs) => {
    await requireAuth(request, currentUser)
    return defer({ hostVans: getHostVans() })
}

const HostVans = () => {
    const { hostVans } = useLoaderData() as { hostVans: Van }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <React.Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={hostVans}>
                    <HostVansPreview />
                </Await>
            </React.Suspense>
        </section>
    )
}

export default HostVans