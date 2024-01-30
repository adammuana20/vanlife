import { Form, useNavigation, useActionData, NavLink } from "react-router-dom"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase"

import { noAuthRequire } from "../../utils/loaders"
import { User } from "firebase/auth"

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData()
  const displayName = formData.get('displayName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  try {

    if(password !== confirmPassword) {
      throw new Error('Password Did Not Match')
    }

    const auth = await createAuthUserWithEmailAndPassword(email, password)

    if(auth && auth.user) {
      const { user } = auth
      await createUserDocumentFromAuth(user, { displayName })
    }
        
    return "Account Created Successfully"
  } catch(err) {
    const firebaseError = err as { code: string }
      switch(firebaseError.code) {
        case 'email-already-in-use':
          return "Email already exist!";
        case 'auth/weak-password':
          return "Password should be at least 6 characters!";
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
  const actionMessage = useActionData();
  const errorMessage: React.ReactNode = typeof actionMessage === 'string' ? actionMessage : null;

  return (
    <div className="auth-container">
      <h2>Don&apos;t have an account?</h2>
      <span>Sign Up with your email and password</span>
      {errorMessage && <h4 className="red">{errorMessage}</h4>}
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
        <button 
          disabled={navigation.state === "submitting"} 
          type="submit"
          className="btn"
        >
          {navigation.state === "submitting"
            ? 'Signing Up...'
            : 'Sign Up'
          }
        </button>
        <div className="text-center mt-8">
            Already have an account? <NavLink to='/login' className="text-dark-red hover:underline">Log in your account.</NavLink>
        </div>
        <div className="flex items-center justify-center my-2">
            <div className="flex-1 text-dark-gray h-px bg-light-gray"></div>
            <div className="px-4">or</div>
            <div className="flex-1 text-dark-gray h-px bg-light-gray"></div>
        </div>
        <button type='button' onClick={signInWithGooglePopup} className="btn mt-0">
            Google Sign In
        </button>
      </Form>
    </div>
  )
}

export default SignUp