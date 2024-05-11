import { User } from "firebase/auth"
import { defer } from "react-router-dom"
import { requireAuth } from "../utils/authentication"
import { getHostVans } from "../utils/firebase"

let Dashboard: React.ComponentType<any>;

export const loader = (currentUser: User | null) => async({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)

    let controller = new AbortController()

    import('../components/Host/Dashboard/Dashboard').then(
        (componentModule) => {
            if(!controller.signal.aborted) {
                Dashboard = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading Host component:", error);
        controller.abort()
    });

    try {
        return defer({ vans: getHostVans() })
    } finally {
        controller.abort()
    }
}