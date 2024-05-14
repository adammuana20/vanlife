import { User } from "firebase/auth"
import { defer } from "react-router-dom"
import { requireAuth } from "../utils/authentication"
import { getHostVans } from "../utils/firebase"

let Dashboard: React.ComponentType<any>;

export const loader = (currentUser: User | null) => async({ request }: { request: Request }) => {
    await requireAuth(request, currentUser)

    return defer({ vans: getHostVans() })
}