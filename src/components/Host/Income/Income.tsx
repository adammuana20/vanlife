import { Await, useLoaderData } from "react-router-dom"
import React from "react"

import Transactions from "./Transactions"
import BarGraph from "./BarGraph"

import { Van } from "../../../utils/firebase"
import SkeletonHostIncome from "../../Skeletons/Host/SkeletonHostIncome"

const Income = () => {
    const { vans } = useLoaderData() as { vans: Van[]}
    
    return (
        <section className="px-0 md:px-7 text-semi-black">
            <React.Suspense fallback={<SkeletonHostIncome />}>
                <Await resolve={vans}>
                    <BarGraph />
                    <Transactions />
                </Await>
            </React.Suspense>
        </section>
    )
}

export default Income