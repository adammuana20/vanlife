import React, { useMemo } from "react"
import { Link, useLocation, useLoaderData, defer, Await, LoaderFunctionArgs, ParamParseKey } from "react-router-dom";

import VanDetail from "./VanDetail";

import { Reservation, Van, getReservationsDocuments, getVan } from "../../utils/firebase"

const VANS_ROUTE = '/vans/:id';

export type TypedParams = Record<ParamParseKey<typeof VANS_ROUTE>, string>;

export const loader = async ({ params }: LoaderFunctionArgs) => {
    return defer({ van: getVan((params as TypedParams).id), reservations: getReservationsDocuments((params as TypedParams).id) })
}

const VanPreview = () => {
    const location = useLocation()
    const { van, reservations } = useLoaderData() as { van: Van, reservations: Reservation[] }
    
    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    const allPromise = useMemo(() => Promise.all([van, reservations]),[van, reservations])

    return (
        <div className="px-7">
            <Link
                to={`..${search}`}
                relative="path"
                className="text-black hover:underline"
            >
                &larr; <span>Back to {type} vans</span>
            </Link>
            <React.Suspense fallback={<h3>Loading van...</h3>}>
                <Await resolve={allPromise}>
                    <VanDetail />
                </Await>
            </React.Suspense>
        </div>
    )
}

export default VanPreview