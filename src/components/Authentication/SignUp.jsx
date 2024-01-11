import { Form, useNavigation, useActionData } from "react-router-dom"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const displayName = formData.get('displayName')
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  try {

    if(password !== confirmPassword) {
      throw new Error('Password Did Not Match')
    }

    const { user } = await createAuthUserWithEmailAndPassword(email, password)
    await createUserDocumentFromAuth(user, { displayName })
    
    return "Account Created Successfully"
  } catch(err) {
    if(err.code === 'auth/email-already-in-use') {
      return "Email already exist!";
    } else if(err.code === 'auth/weak-password') {
      return "Password should be at least 6 characters!";
    }
    return err.message;
  }
}

const SignUp = () => {
  const navigation = useNavigation();
  const errorMessage = useActionData();

  return (
    <div className="login-container">
      <h2>Don&apos;t have an account?</h2>
      <span>Sign Up with your email and password</span>
      {errorMessage && <h4 className="red">{errorMessage}</h4>}
      <Form
        method="post"
        className="login-form"
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
        >
          {navigation.state === "submitting"
            ? 'Signing Up...'
            : 'Sign Up'
          }
        </button>
      </Form>
    </div>
  )
}

export default SignUp