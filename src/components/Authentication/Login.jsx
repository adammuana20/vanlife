import { 
    useLoaderData, 
    Form, 
    useActionData,
    useNavigation,
} from "react-router-dom";

import { 
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase"

import { noAuthRequire } from "../../utils";


export const action = async ({ request }) => {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    
    try {
        await signInAuthUserWithEmailAndPassword(email, password);

        return null
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

export const loader = (currentUser) => async ({ request }) => {
    await noAuthRequire(request, currentUser)
    return new URL(request.url).searchParams.get("message")
}

export const Login = () => {
    const message = useLoaderData()
    const errorMessage = useActionData();
    const navigation = useNavigation();

    
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
                <button type='button' onClick={signInWithGooglePopup}>
                    Google Sign In
                </button>
            </Form>
        </div>
    )
}

export default Login