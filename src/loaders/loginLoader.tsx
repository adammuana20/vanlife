import { User } from "firebase/auth"
import { toast } from "react-toastify"

import { noAuthRequire } from "../utils/authentication"
import { signInAuthUserWithEmailAndPassword } from "../utils/firebase"
import { redirect } from "react-router-dom"

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    return signInAuthUserWithEmailAndPassword(email, password)
        .then(() => {
            toast.success('Login Successful!')
            throw redirect('/login')
        })
        .catch((err) => {
            const firebaseError = err as { code: string }
            switch(firebaseError.code) {
                case 'auth/invalid-credential': 
                    return toast.error('Incorrect Email or Password!')
                case 'auth/user-not-found':
                    return toast.error('User not found!')
                default:
                    return err
            }
        })
}

export const loader = (currentUser: User | null) => async ({ request }: { request: Request }) => {
    await noAuthRequire(request, currentUser)
    const message = new URL(request.url).searchParams.get("message")
    
    return toast.error(message)
}