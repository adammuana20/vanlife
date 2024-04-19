import { FC, useEffect } from "react";
import { useAsyncValue } from "react-router-dom"
import VanCard from "./VanCard"

import { Favorite, Van } from "../../utils/firebase";

type VansPreviewProps = {
    searchParams: URLSearchParams;
    typeFilter: string | null;
}

const VansPreview: FC<VansPreviewProps> = ({ searchParams, typeFilter }) => {
    const data = useAsyncValue() as [Van[], Favorite[]]

    const [vans, favorites] = data

    const displayVans = typeFilter
        ? vans.filter(van => van.type.toLowerCase() === typeFilter)
        : vans
    
    return (
        <div className="grid grid-cols-4 justify-items-center mt-14 gap-8">
            { displayVans.map(van => <VanCard key={van.id} van={van} favorites={favorites} searchParams={searchParams} typeFilter={typeFilter} /> )}
        </div>
    )
}

export default VansPreview