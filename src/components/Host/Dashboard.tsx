import React from "react"
import { Link, defer, Await, useLoaderData } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { User } from "firebase/auth"

import HostDashboardVansPreview from "./HostDashboardVansPreview"

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
            <section className="bg-semi-light-orange flex justify-between items-center py-9 px-6">
                <div>
                    <h1 className="text-semi-black m-0">Welcome!</h1>
                    <p className="text-dark-gray">Income last <span className="font-bold underline">30 days</span></p>
                    <h2 className="m-0 font-black text-semi-black">$2,260</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="bg-semi-orange py-6 px-7 flex items-center">
                <h2 className="m-0">Review score</h2>
                <BsStarFill className="text-primary-color ml-4 text-2xl" />
                <p className="ml-1 text-xl text-dark-gray mr-auto">
                    <span className="font-bold text-semi-black">5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="px-6 py-5">
                <React.Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={vans}>
                        <HostDashboardVansPreview />
                    </Await>
                </React.Suspense>
            </section>
        </>
    )
}

export default Dashboard;