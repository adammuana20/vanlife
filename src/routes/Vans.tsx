import React, { useEffect, useMemo } from "react";
import { 
    useSearchParams, 
    useLoaderData, 
    defer,
    Await
} from "react-router-dom";

import VansPreview from "../components/Vans/VansPreview";
import VansCategories from "../components/Vans/VansCategories";

import { Favorite, getFavorites, getVansDocuments, Van } from "../utils/firebase";

export const loader = () => {    
    return defer({ vans: getVansDocuments(), favorites: getFavorites() })
}

const Vans = () => {
    const { vans, favorites } = useLoaderData() as { vans: Van[], favorites: Favorite[] }
    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");

    const allPromise = useMemo(() => Promise.all([vans, favorites]),[vans, favorites])

    const handleFilterChange = (key: string, value: string) => {
        setSearchParams(prevParams => {
            if(value === '') {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <div className="px-6">
            <h2>Explore our van options</h2>
            <React.Suspense fallback={<h3>Loading vans...</h3>}>
                <Await resolve={allPromise}>
                    <VansCategories handleFilterChange={handleFilterChange} typeFilter={typeFilter} />
                    <VansPreview searchParams={searchParams} typeFilter={typeFilter} />
                </Await>
           </React.Suspense>
        </div>
    )
}

export default Vans