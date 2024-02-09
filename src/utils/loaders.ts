import { User } from "firebase/auth";
import { redirect } from "react-router-dom"

export const requireAuth = async(request: Request, currentUser: User| null) => {
    const pathname = new URL(request.url).pathname
    
    if(!currentUser) {
        const res = redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
        throw res
    }
    return null
}

export const noAuthRequire = async(request: Request, currentUser: User | null) => {
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    if(currentUser) {
        throw redirect(pathname)
    }

    return null
}

export const createRequestFromLocation = (location: Location): Request => {
    const url = location.href;
    const request = new Request(url);

    return request;
}