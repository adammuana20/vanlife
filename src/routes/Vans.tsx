import React from "react";
import { 
    useSearchParams, 
    useLoaderData, 
    defer,
    Await
} from "react-router-dom";

import VansPreview from "../components/Vans/VansPreview";
import VansCategories from "../components/Vans/VansCategories";

import { getVansDocuments, Van } from "../utils/firebase";

export const loader = () => {
    return defer({ vans: getVansDocuments() })
}

const Vans = () => {
    const { vans } = useLoaderData() as { vans: Van }
    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");

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
                <Await resolve={vans}>
                    <VansCategories handleFilterChange={handleFilterChange} typeFilter={typeFilter} />
                    <VansPreview searchParams={searchParams} typeFilter={typeFilter} />
                </Await>
           </React.Suspense>
        </div>
    )
}

export default Vans