import { User } from "firebase/auth"
import { LoaderFunctionArgs, defer } from "react-router-dom"
import { requireAuth } from "../utils/authentication"
import { getHostVans } from "../utils/firebase"

let HostVans: React.ComponentType<any>;

export const loader = (currentUser: User | null) => async({ request }: LoaderFunctionArgs) => {
    await requireAuth(request, currentUser)

    import('../routes/HostVans').then(
        (componentModule) => {
            if(!request.signal.aborted) {
                HostVans = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading Host Vans component:", error);
        request.signal.aborted
    });

    try {
        return defer({ hostVans: getHostVans() })
    } finally {
        request.signal.aborted
    }
}