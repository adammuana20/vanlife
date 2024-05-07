import { User } from "firebase/auth"
import { Await, defer, useLoaderData } from "react-router-dom"


import { Van, getHostVans } from "../../../utils/firebase"
import { requireAuth } from "../../../utils/loaders"
import React from "react"
import Graph from "./Graph"
import Transactions from "./Transactions"

export const loader = (currentUser: User | null) => async({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)
    return defer({ vans: getHostVans() })
}

const Income = () => {
    const { vans } = useLoaderData() as { vans: Van[]}
    
    return (
        <section className="px-7 text-semi-black">
            <h2>Income</h2>
            <React.Suspense fallback={<h3>Loading...</h3>}>
                <Await resolve={vans}>
                    <Graph />
                    <Transactions />
                </Await>
            </React.Suspense>
        </section>
    )
}

export default Income