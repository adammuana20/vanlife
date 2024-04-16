import { Suspense, useEffect, useState } from "react";
import { 
  useSearchParams, 
  useLoaderData, 
  defer,
  Await
} from "react-router-dom";

import TripsPreview from "../components/Trips/TripsPreview";

import { Reservation, Trip, getUserReservationTripsDocuments, getVan } from "../utils/firebase"

export const loader = () => {
  return defer({ trips: getUserReservationTripsDocuments() })
}

const Trips = () => {
  const { trips } = useLoaderData() as { trips: Reservation[] }

  return (
    <div className="px-6">
      <h2>Trips</h2>
      <Suspense fallback={<h3>Loading trips...</h3>}>
        <Await resolve={trips}>
          <TripsPreview />
        </Await>
      </Suspense>
    </div>
  )
}

export default Trips