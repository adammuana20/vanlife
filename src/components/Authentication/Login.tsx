import { 
    useLoaderData, 
    Form, 
    useActionData,
    useNavigation,
    NavLink,
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
        <div className="auth-container">
            <h2>Already have an account?</h2>
            <span>Sign in to your account</span>
            { message && <h3 className="text-dark-red">{message}</h3> }
            { errorMessage && <h3 className="text-dark-red">{errorMessage}</h3> }
            <Form 
                method="post" 
                className="auth-form"
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
                <button disabled={navigation.state === "submitting"} type='submit' className="btn">
                    {navigation.state === "submitting" 
                    ? "Logging in..." 
                    : "Log in"}
                </button>
                <div className="text-center mt-8">
                    Don't have an account? <NavLink to='/sign-up' className="text-dark-red hover:underline hover:text-dark-red">Create an account.</NavLink>
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

export default Login