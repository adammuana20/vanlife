import React, { useMemo } from "react";
import { 
    useSearchParams, 
    useLoaderData,
    Await,
} from "react-router-dom";

import VansPreview from "../components/Vans/VansPreview";
import VansCategories from "../components/Vans/VansCategories";
import Loading from "../components/Loading";

import { Favorite, Van } from "../utils/firebase";

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
            <React.Suspense fallback={<Loading />}>
                <Await resolve={allPromise}>
                    <VansCategories handleFilterChange={handleFilterChange} typeFilter={typeFilter} />
                    <VansPreview searchParams={searchParams} typeFilter={typeFilter} />
                </Await>
           </React.Suspense>
        </div>
    )
}

export default Vans