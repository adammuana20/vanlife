import { User } from "firebase/auth"
import { defer } from "react-router-dom"
import { requireAuth } from "../utils/authentication"
import { getUserReservationTripsDocuments, getFavorites } from "../utils/firebase"

let Trips: React.ComponentType<any>;

export const loader = (currentUser: User | null) => async ({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)

    let controller = new AbortController()

    import('../routes/Trips').then(
        (componentModule) => {
            if(!controller.signal.aborted) {
                Trips = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading Trips component:", error);
        controller.abort()
    });

    try {
        return defer({ trips: getUserReservationTripsDocuments(), favorites: getFavorites() })
    } finally {
        controller.abort()
    }
  }