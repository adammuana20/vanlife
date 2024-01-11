import { useEffect, useContext } from "react";
import { getRedirectResult } from "firebase/auth";
import { 
    useLoaderData, 
    Form, 
    redirect, 
    useActionData,
    useNavigation
} from "react-router-dom";

import { 
    loginUser, 
    createUserDocumentFromAuth, 
    signInWithGoogleRedirect, 
    auth,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase"


export const action = (setCurrentUser) => async ({ request }) => {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        const { user } = await signInAuthUserWithEmailAndPassword(email, password);
        // localStorage.setItem("loggedin", true)

        // const res = redirect(pathname)
        // res.body = true
        // return res
        setCurrentUser(user)
        return redirect(pathname)
    } catch (err) {
        switch(err.code) {
            case 'auth/invalid-credential': 
                return 'Incorrect Email or Password!'
            case 'auth/user-not-found':
                return 'User not found!'
            default:
                return err
        }
    }
}

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export default function Login() {
    const message = useLoaderData()
    const errorMessage = useActionData();
    const navigation = useNavigation();

    useEffect(() => {

        const result = async () => {
            const response = await getRedirectResult(auth)
            if(response) {
                const { user } = response
                await createUserDocumentFromAuth(user)
            }
        }

        result()
    }, [])
    
    return (
        <div className="login-container">
            <h2>Already have an account?</h2>
            <span>Sign in to your account</span>
            { message && <h3 className="red">{message}</h3> }
            { errorMessage && <h3 className="red">{errorMessage}</h3> }
            <Form 
                method="post" 
                className="login-form"
                replace
            >
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
                <button disabled={navigation.state === "submitting"} type='submit'>
                    {navigation.state === "submitting" 
                    ? "Logging in..." 
                    : "Log in"}
                </button>
                <button type='button' onClick={signInWithGoogleRedirect}>
                    Google Sign In
                </button>
            </Form>
        </div>
    )
}