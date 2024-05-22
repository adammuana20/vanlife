import React from "react"
import { useLoaderData,  Await } from "react-router-dom"

import HostVansPreview from "../components/Host/HostVansPreview"
import SkeletonHostVans from "../components/Skeletons/Host/SkeletonHostVans"

import { Van } from "../utils/firebase"

const HostVans = () => {
    const { hostVans } = useLoaderData() as { hostVans: Van }

    return (
        <section className="px-0 md:px-7">
            <React.Suspense fallback={<SkeletonHostVans />}>
                <Await resolve={hostVans}>
                    <HostVansPreview />
                </Await>
            </React.Suspense>
        </section>
    )
}

export default HostVans