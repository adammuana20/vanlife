import React from "react"
import { useLoaderData, defer, Await, LoaderFunctionArgs } from "react-router-dom"
import { User } from "firebase/auth"

import HostVansPreview from "../components/Host/HostVansPreview"
import Loading from "../components/Loading"

import { Van, getHostVans } from "../utils/firebase"
import { requireAuth } from "../utils/loaders"


export const loader = (currentUser: User | null) => async({ request }: LoaderFunctionArgs) => {
    await requireAuth(request, currentUser)
    return defer({ hostVans: getHostVans() })
}

const HostVans = () => {
    const { hostVans } = useLoaderData() as { hostVans: Van }

    return (
        <section className="px-7">
            <React.Suspense fallback={<Loading />}>
                <Await resolve={hostVans}>
                    <HostVansPreview />
                </Await>
            </React.Suspense>
        </section>
    )
}

export default HostVans