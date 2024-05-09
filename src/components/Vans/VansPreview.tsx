import { FC, useEffect } from "react";
import { useAsyncValue } from "react-router-dom"

import VanCard from "./VanCard"
import NoState from "../NoState";

import { Favorite, Van } from "../../utils/firebase";
import { Timestamp } from "@firebase/firestore";

type VansPreviewProps = {
    searchParams: URLSearchParams;
    typeFilter: string | null;
}

const VansPreview: FC<VansPreviewProps> = ({ searchParams, typeFilter }) => {
    const data = useAsyncValue() as [Van[], Favorite[]]
    const bathroomCountParam = searchParams.get("bathroomCount");
    const bathroomCount = bathroomCountParam ? parseInt(bathroomCountParam) : 0;
    const bedCountParam = searchParams.get("bedCount");
    const bedCount = bedCountParam ? parseInt(bedCountParam) : 0;
    const capacityCountParam = searchParams.get("capacityCount");
    const capacityCount = capacityCountParam ? parseInt(capacityCountParam) : 1;
    const location = searchParams.get("location") || '';
    const startDateParam = searchParams.get("startDate");
    const startDate = startDateParam ? Timestamp.fromDate(new Date(startDateParam)) : '';
    const endDateParam = searchParams.get("endDate");
    const endDate = endDateParam ? Timestamp.fromDate(new Date(endDateParam)) : '';
    
    const [vans, favorites] = data

    let displayVans = vans

    if(typeFilter) {
        displayVans = displayVans.filter(van => van.type.toLowerCase() === typeFilter) 
    }

    if(bathroomCount >= 0) {
        displayVans = displayVans.filter(van => van.bathroomCount >= bathroomCount) 
    }

    if(bedCount >= 0) {
        displayVans = displayVans.filter(van => van.bedCount >= bedCount)
    }

    if(capacityCount >= 1) {
        displayVans = displayVans.filter(van => van.capacityCount >= capacityCount)
    }

    if(location) {
        displayVans = displayVans.filter(van => van.locationValue === location)
    }

    if(startDate && endDate) {
        displayVans = displayVans.filter(van => !van.reservations.some(reservation =>     reservation.startDate <= startDate && reservation.endDate >= startDate 
            || reservation.startDate <= endDate && reservation.endDate >= endDate
            || startDate <= reservation.startDate && endDate >= reservation.endDate))
    }
    
    return (
        displayVans.length ? ( 
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center mt-14 gap-8">
                { displayVans.map(van => <VanCard key={van.id} van={van} favorites={favorites} searchParams={searchParams} typeFilter={typeFilter} /> )}
            </div>
        ) : (
            <NoState showReset /> 
        )
    )
}

export default VansPreview