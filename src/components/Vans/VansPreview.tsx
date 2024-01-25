import { FC } from "react";
import { useAsyncValue } from "react-router-dom"
import VanCard from "./VanCard"

import { Van } from "../../utils/firebase";

type VansPreviewProps = {
    searchParams: URLSearchParams;
    typeFilter: string | null;
}

const VansPreview: FC<VansPreviewProps> = ({ searchParams, typeFilter }) => {
    const vans = useAsyncValue() as Van[]

    const displayVans = typeFilter
        ? vans.filter(van => van.type.toLowerCase() === typeFilter)
        : vans
    
    return (
        <div className="van-list">
            { displayVans.map(van => <VanCard key={van.id} van={van} searchParams={searchParams} typeFilter={typeFilter} /> )}
        </div>
    )
}

export default VansPreview