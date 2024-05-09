import { User } from "firebase/auth"
import { Await, defer, useLoaderData } from "react-router-dom"
import React from "react"

import Transactions from "./Transactions"
import BarGraph from "./BarGraph"
import Loading from "../../Loading"

import { Van, getHostVans } from "../../../utils/firebase"
import { requireAuth } from "../../../utils/loaders"



export const loader = (currentUser: User | null) => async({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)
    return defer({ vans: getHostVans() })
}

const Income = () => {
    const { vans } = useLoaderData() as { vans: Van[]}
    
    return (
        <section className="px-7 text-semi-black">
            <React.Suspense fallback={<Loading />}>
                <Await resolve={vans}>
                    <BarGraph />
                    <Transactions />
                </Await>
            </React.Suspense>
        </section>
    )
}

export default Income