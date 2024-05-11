import { User } from "firebase/auth"
import { defer } from "react-router-dom"
import { requireAuth } from "../utils/authentication"
import { getFavorites } from "../utils/firebase"

let Favorites: React.ComponentType<any>;

export const loader = (currentUser: User | null) => async ({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)

    let controller = new AbortController()

    import('../routes/Favorites').then(
        (componentModule) => {
            if(!controller.signal.aborted) {
                Favorites = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading Favorites component:", error);
        controller.abort()
    });

    try {
        return defer({ favorites: getFavorites() })
    } finally {
        controller.abort()
    }
  }