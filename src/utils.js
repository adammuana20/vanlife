import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedin");

    if(!isLoggedIn) {
        const res = redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
        res.body = true
        return res
    }
    return null
}