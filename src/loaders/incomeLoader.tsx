import { User } from "firebase/auth"
import { defer } from "react-router-dom"
import { requireAuth } from "../utils/authentication"
import { getHostVans } from "../utils/firebase"

let Income: React.ComponentType<any>;

export const loader = (currentUser: User | null) => async({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)

    import('../components/Host/Income/Income').then(
        (componentModule) => {
            if(!request.signal.aborted) {
                Income = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading Income component:", error);
        request.signal.aborted
    });

    try {
        return defer({ vans: getHostVans() })
    } finally {
        request.signal.aborted
    }
}