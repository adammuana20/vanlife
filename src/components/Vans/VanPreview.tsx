import React, { useMemo } from "react"
import { Link, useLocation, useLoaderData, Await } from "react-router-dom";

import VanDetail from "./VanDetail";
import Loading from "../Loading";

import { Reservation, Van, Favorite } from "../../utils/firebase"
import { capitalizeEachWord } from "../../utils/helpers";
import SkeletonVanDetail from "../Skeletons/Host/SkeletonVanDetail";

const VanPreview = () => {
    const location = useLocation()
    const { van, reservations, favorites } = useLoaderData() as { van: Van, reservations: Reservation[], favorites: Favorite }
    
    const search = location.state?.search || '';
    const type = location.state?.type || "all";
    const { prevLocation } = location.state;

    const allPromise = useMemo(() => Promise.all([van, reservations, favorites]),[van, reservations, favorites])

    return (
        <div className="max-w-screen-lg mx-auto">
            <Link
                to={`${search === '' ? prevLocation : '..?'+search }`}
                relative="path"
                className="text-black hover:underline block my-3"
            >
                &larr; <span>Back to {prevLocation === '/vans' ? capitalizeEachWord(type) + ' vans' : type}</span>
            </Link>
            <React.Suspense fallback={<SkeletonVanDetail />}>
                <Await resolve={allPromise}>
                    <VanDetail />
                </Await>
            </React.Suspense>
        </div>
    )
}

export default VanPreview