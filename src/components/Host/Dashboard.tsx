import React from "react"
import { Link, defer, Await, useLoaderData } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { User } from "firebase/auth"

import HostVansPreview from "./HostVansPreview"

import { Van, getHostVans } from "../../utils/firebase"
import { requireAuth } from "../../utils/loaders"


export const loader = (currentUser: User | null) => async({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)
    return defer({ vans: getHostVans() })
}

const Dashboard = () => {
    const { vans } = useLoaderData() as { vans: Van[] }

    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,260</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                <React.Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={vans}>
                        <HostVansPreview />
                    </Await>
                </React.Suspense>
            </section>
        </>
    )
}

export default Dashboard;