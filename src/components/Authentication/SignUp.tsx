import { Form, useNavigation, useActionData, NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { User } from "firebase/auth"

import Button from "../Button"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGithubPopup, signInWithGooglePopup } from "../../utils/firebase"
import { noAuthRequire } from "../../utils/loaders"

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

export const loader = (currentUser: User | null) => async ({ request }: { request: Request }) => {
  return await noAuthRequire(request, currentUser)
}

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <div className="auth-container">
      <h2>Don&apos;t have an account?</h2>
      <span>Sign Up with your email and password</span>
      <Form
        method="post"
        className="auth-form"
      >
        <input 
          type="text"
          name="displayName"
          placeholder="Display Name"
          required
        />
        <input 
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input 
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <div className="mt-8">
          <Button
              label='Sign Up'
              disabled={navigation.state === 'submitting'}
              disabledLabel="Signing up..."
              type="submit"
          />
        </div>
        <div className="text-center mt-8">
            Already have an account? <NavLink to='/login' className="text-primary-color">Log in your account.</NavLink>
        </div>
        <div className="flex items-center justify-center my-2">
            <div className="flex-1 text-dark-gray h-px bg-light-gray"></div>
            <div className="px-4">or</div>
            <div className="flex-1 text-dark-gray h-px bg-light-gray"></div>
        </div>
        <div className="flex gap-4 flex-col">
            <Button
                label='Google Sign In'
                onClick={signInWithGooglePopup}
                icon={FcGoogle}
                disabled={navigation.state === 'submitting'}
                outline
            />
            <Button
                label='Google Sign In'
                onClick={signInWithGithubPopup}
                icon={AiFillGithub}
                disabled={navigation.state === 'submitting'}
                outline
            />
        </div>
      </Form>
    </div>
  )
}

export default SignUp