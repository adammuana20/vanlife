import React from "react"
import { Link, useLoaderData, defer, Await, LoaderFunctionArgs } from "react-router-dom"
import { User } from "firebase/auth"

import { Van, getHostVans } from "../../utils/firebase"
import { requireAuth } from "../../utils/loaders"


export const loader = (currentUser: User | null) => async({ request }: LoaderFunctionArgs) => {
    await requireAuth(request, currentUser)
    return defer({ hostVans: getHostVans() })
}

export default function HostVans() {
    const dataPromise = useLoaderData()

    function renderVanElements(vans: Van[]) {
        const hostVansEls = vans.map(van => (
            <Link
                to={van.id}
                key={van.id}
                className="host-van-link-wrapper"
            >
                <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        ))

        return (
            <div className="host-vans-list">
                <section>
                    {hostVansEls}
                </section>
            </div>
        )
    }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
                <React.Suspense fallback={<h2>Loading vans...</h2>}>
                    <Await resolve={dataPromise?.hostVans}>
                        {renderVanElements}
                    </Await>
                </React.Suspense>
        </section>
    )
}