import { Suspense, useMemo } from "react";
import { 
  useLoaderData, 
  Await
} from "react-router-dom";

import TripsPreview from "../components/Trips/TripsPreview";
import Loading from "../components/Loading";

import { Favorite, Reservation } from "../utils/firebase"

const Trips = () => {
  const { trips, favorites } = useLoaderData() as { trips: Reservation[], favorites: Favorite[] }

  const allPromise = useMemo(() => Promise.all([trips, favorites]),[trips, favorites])

  return (
    <div className="px-6">
      <Suspense fallback={<Loading />}>
        <Await resolve={allPromise}>
          <TripsPreview />
        </Await>
      </Suspense>
    </div>
  )
}

export default Trips