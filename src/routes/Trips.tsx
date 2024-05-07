import { Suspense, useEffect, useMemo, useState } from "react";
import { 
  useSearchParams, 
  useLoaderData, 
  defer,
  Await
} from "react-router-dom";

import TripsPreview from "../components/Trips/TripsPreview";

import { Favorite, Reservation, getFavorites, getUserReservationTripsDocuments } from "../utils/firebase"
import { User } from "firebase/auth";
import { requireAuth } from "../utils/loaders";

export const loader = (currentUser: User | null) => async ({ request }: { request: Request }) => {
  await requireAuth(request, currentUser)
  return defer({ trips: getUserReservationTripsDocuments(), favorites: getFavorites() })
}

const Trips = () => {
  const { trips, favorites } = useLoaderData() as { trips: Reservation[], favorites: Favorite[] }

  const allPromise = useMemo(() => Promise.all([trips, favorites]),[trips, favorites])

  return (
    <div className="px-6">
      <Suspense fallback={<h3>Loading trips...</h3>}>
        <Await resolve={allPromise}>
          <TripsPreview />
        </Await>
      </Suspense>
    </div>
  )
}

export default Trips