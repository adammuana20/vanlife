import { useAsyncValue } from "react-router-dom"
import VanCard from "../Vans/VanCard";
import { Reservation, Trip, getVan } from "../../utils/firebase";
import { useEffect, useState } from "react";

const TripsPreview = () => {
    const tripsData = useAsyncValue() as Trip[]    
    
    return (
        <div className="grid grid-cols-4 justify-items-center mt-14 gap-8">
            { tripsData.map((trip, idx) => {
                const jsStartDate = trip.startDate.toDate()
                const jsEndDate = trip.endDate.toDate()
                // Options for date formatting
                const options = { month: 'short', day: '2-digit', year: 'numeric' } as const;                

                // Format the date using options
                const startDate = jsStartDate.toLocaleDateString('en-US', options);
                const endDate = jsEndDate.toLocaleDateString('en-US', options);
                return (
                    <div key={idx} className="flex flex-col">
                        <VanCard van={trip.van} searchParams={new URLSearchParams} typeFilter={'My Reservations'} />
                        <p>{startDate} - {endDate}</p>
                    </div>)
            })}
        </div>
    )
}

export default TripsPreview