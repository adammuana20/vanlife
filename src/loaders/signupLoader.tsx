import { User } from "firebase/auth"
import { LoaderFunctionArgs } from "react-router-dom"
import { toast } from "react-toastify"

import { noAuthRequire } from "../utils/authentication"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase"

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData()
    const displayName = formData.get('displayName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
  
    try {
  
      if(password !== confirmPassword) {
        return toast.warning('Password Did Not Match!')
      }
  
      const auth = await createAuthUserWithEmailAndPassword(email, password)
  
      if(auth && auth.user) {
        const { user } = auth
        await createUserDocumentFromAuth(user, { displayName })
      }
  
      return toast.success('Account Created Successfully')
    } catch(err) {
      const firebaseError = err as { code: string }
      switch(firebaseError.code) {
        case 'auth/email-already-in-use':
          return toast.warning("Email already exist!")
        case 'auth/weak-password':
          return toast.warning("Password should be at least 6 characters!")
        default:
          return err
      }
    }
  }
  
  export const loader = (currentUser: User | null) => async ({ request }: LoaderFunctionArgs) => {
    return await noAuthRequire(request, currentUser)
  }