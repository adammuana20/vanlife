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

import { noAuthRequire } from "../../utils/loaders";
import { User } from "firebase/auth";


export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    try {
        await signInAuthUserWithEmailAndPassword(email, password);

        return null
    } catch (err) {
        const firebaseError = err as { code: string }
        switch(firebaseError.code) {
            case 'auth/invalid-credential': 
                return 'Incorrect Email or Password!'
            case 'auth/user-not-found':
                return 'User not found!'
            default:
                return err
        }
    }
}

export const loader = (currentUser: User | null) => async ({ request }: { request: Request }) => {
    await noAuthRequire(request, currentUser)
    return new URL(request.url).searchParams.get("message")
}

export const Login = () => {
    const loaderMessage = useLoaderData();
    const message: React.ReactNode = typeof loaderMessage === 'string' ? loaderMessage : null;
    const actionMessage = useActionData();
    const errorMessage: React.ReactNode = typeof actionMessage === 'string' ? actionMessage : null;
    
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