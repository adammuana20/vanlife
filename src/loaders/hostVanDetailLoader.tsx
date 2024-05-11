import { User } from "firebase/auth"
import { LoaderFunctionArgs, defer } from "react-router-dom"
import { TypedParams } from "./vanPreviewLoader"

import { requireAuth } from "../utils/authentication"
import { getVan } from "../utils/firebase"

let HostVanPreview: React.ComponentType<any>;

export const loader = (currentUser: User | null) => async({ request, params }: LoaderFunctionArgs) => {
    await requireAuth(request, currentUser)

    let controller = new AbortController()

    import('../components/Host/Dashboard/Dashboard').then(
        (componentModule) => {
            if(!controller.signal.aborted) {
                HostVanPreview = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading Host Van Detail component:", error);
        controller.abort()
    });

    try {
        return defer({ hostVan: getVan((params as TypedParams).id) })
    } finally {
        controller.abort()
    }

}