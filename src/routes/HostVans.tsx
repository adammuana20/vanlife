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
        <section className="px-7">
            <h2>Your listed vans</h2>
            <React.Suspense fallback={<h3>Loading vans...</h3>}>
                <Await resolve={hostVans}>
                    <HostVansPreview />
                </Await>
            </React.Suspense>
        </section>
    )
}

export default HostVans