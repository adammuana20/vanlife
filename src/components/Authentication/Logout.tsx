import { useEffect } from "react"
import { useNavigate, useActionData } from "react-router-dom"

import { signOutUser } from "../../utils/firebase"
import NotFound from "../404"
import { toast } from "react-toastify"


export const action = async () => {
    await signOutUser()
    toast.success('Logged out Successful!')
    const pathname = '/login'
    return pathname
}

const Logout = () => {
    const navigate = useNavigate()
    const logoutNav = useActionData()

    useEffect(() => {
        if(logoutNav) {
            navigate(logoutNav, { replace: true })
        }
    }, [])


    return (
        logoutNav
            ? null
            : <NotFound />
    )
}

export default Logout