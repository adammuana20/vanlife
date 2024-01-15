import { redirect } from "react-router-dom"

export const requireAuth = async(request, currentUser) => {
    const pathname = new URL(request.url).pathname

    if(!currentUser) {
        const res = redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
        throw res
    }
    return null
}

export const noAuthRequire = async(request, currentUser) => {
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    if(currentUser) {
        throw redirect(pathname)
    }

    return null
}