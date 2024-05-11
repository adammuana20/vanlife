import { User } from "firebase/auth"
import { LoaderFunctionArgs, defer } from "react-router-dom"
import { requireAuth } from "../utils/authentication"
import { getHostVans } from "../utils/firebase"

let HostVans: React.ComponentType<any>;

export const loader = (currentUser: User | null) => async({ request }: LoaderFunctionArgs) => {
    await requireAuth(request, currentUser)

    
    let controller = new AbortController()

    import('../routes/HostVans').then(
        (componentModule) => {
            if(!controller.signal.aborted) {
                HostVans = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading Host Vans component:", error);
        controller.abort()
    });

    try {
        return defer({ hostVans: getHostVans() })
    } finally {
        controller.abort()
    }
}