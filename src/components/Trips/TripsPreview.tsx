import { Form, useAsyncValue, useRevalidator } from "react-router-dom"
import { useState } from "react";
import { toast } from "react-toastify";

import VanCard from "../Vans/VanCard";
import Button from "../Button";
import NoVan from "../NoVan";

import { Favorite, Trip, cancelUserTripReservation, getVan } from "../../utils/firebase";

const TripsPreview = () => { 
    const data = useAsyncValue() as [Trip[], Favorite[]]
    const revalidator = useRevalidator()
    
    const [trips, favorites] = data
    // State to track loading state for each trip
    const [isLoadingMap, setIsLoadingMap] = useState<{ [key: string]: boolean }>({})

    // Function to toggle loading state for a specific trip
    const toggleLoading = (tripId: string) => {
        setIsLoadingMap(prevState => ({
            ...prevState,
            [tripId]: !prevState[tripId] // Toggle loading state for the specified trip
        }))
    }

    const cancelReservation = (tripId: string): React.MouseEventHandler<HTMLButtonElement> => ()  => {
            toggleLoading(tripId)
            cancelUserTripReservation(tripId)
            .then(() => {
                toast.success('Reservation Cancelled!')
            })
            .catch((err) => {
                toast.error('Error canceling reservation', err);
            })
            .finally(() => {
                toggleLoading(tripId)
                revalidator.revalidate()
            })
    }

    return (
        trips.length ? (
            <>
                <h2>Trips</h2>
                <div className="grid grid-cols-4 justify-items-center mt-14 gap-8">
                    { trips.map((trip) => {
                        const jsStartDate = trip.startDate.toDate()
                        const jsEndDate = trip.endDate.toDate()
                        // Options for date formatting
                        const options = { month: 'short', day: '2-digit', year: 'numeric' } as const;                

                        // Format the date using options
                        const startDate = jsStartDate.toLocaleDateString('en-US', options);
                        const endDate = jsEndDate.toLocaleDateString('en-US', options);

                        return (
                            <div key={trip.id} className="flex flex-col">
                                <VanCard van={trip.van} favorites={favorites} searchParams={new URLSearchParams} typeFilter={'My Reservations'} />
                                <p>{startDate} - {endDate}</p>
                                <Button 
                                    label="Cancel Reservation"
                                    onClick={cancelReservation(trip.id)}
                                    disabled={isLoadingMap[trip.id]}
                                    disabledLabel="Cancelling..."
                                />
                            </div>
                        )
                    })}
                </div>
            </>
            ) : (
                <NoVan 
                    title="No trip found"
                    subtitle="Looks like you haven't reserved any van."
                />
        )
    )
}

export default TripsPreview