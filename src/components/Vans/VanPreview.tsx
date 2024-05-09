import React, { useMemo } from "react"
import { Link, useLocation, useLoaderData, defer, Await, LoaderFunctionArgs, ParamParseKey } from "react-router-dom";

import VanDetail from "./VanDetail";
import Loading from "../Loading";

import { Reservation, Van, getVanReservationsDocuments, getVan, getFavorite, Favorite } from "../../utils/firebase"

const VANS_ROUTE = '/vans/:id';

export type TypedParams = Record<ParamParseKey<typeof VANS_ROUTE>, string>;

export const loader = async ({ params }: LoaderFunctionArgs) => {
    return defer({ van: getVan((params as TypedParams).id), reservations: getVanReservationsDocuments((params as TypedParams).id), favorites: getFavorite((params as TypedParams).id) })
}

const VanPreview = () => {
    const location = useLocation()
    const { van, reservations, favorites } = useLoaderData() as { van: Van, reservations: Reservation[], favorites: Favorite }
    
    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    const allPromise = useMemo(() => Promise.all([van, reservations, favorites]),[van, reservations, favorites])

    return (
        <div className="px-7">
            <Link
                to={`..${search}`}
                relative="path"
                className="text-black hover:underline"
            >
                &larr; <span>Back to {type} vans</span>
            </Link>
            <React.Suspense fallback={<Loading />}>
                <Await resolve={allPromise}>
                    <VanDetail />
                </Await>
            </React.Suspense>
        </div>
    )
}

export default VanPreview