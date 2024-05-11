import { Await, useLoaderData } from "react-router-dom"
import React from "react"

import Transactions from "./Transactions"
import BarGraph from "./BarGraph"
import Loading from "../../Loading"

import { Van } from "../../../utils/firebase"

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