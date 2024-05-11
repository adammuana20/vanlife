import { User } from "firebase/auth"
import { toast } from "react-toastify"

import Loading from "../components/Loading"

import { noAuthRequire } from "../utils/authentication"
import { signInAuthUserWithEmailAndPassword } from "../utils/firebase"

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
        return signInAuthUserWithEmailAndPassword(email, password)
            .then(() => {
                <Loading />
                return toast.success('Login Successful!')
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
    return new URL(request.url).searchParams.get("message")
}