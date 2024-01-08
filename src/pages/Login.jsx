import { 
    useLoaderData, 
    Form, 
    redirect, 
    useActionData,
    useNavigation
} from "react-router-dom";
import { loginUser, signInWithGooglePopup, createUserDocumentFromAuth } from "../api"

export async function action({ request }) {
    const  formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        const data = await loginUser({ email, password });
        localStorage.setItem("loggedin", true)

        const res = redirect(pathname)
        res.body = true
        return res
    } catch (err) {
        return err.message
    }
}

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export default function Login() {
    const message = useLoaderData()
    const errorMessage = useActionData();
    const navigation = useNavigation();

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    
    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
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
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                />
                <button disabled={navigation.state === "submitting"} type='submit'>
                    {navigation.state === "submitting" 
                    ? "Logging in..." 
                    : "Log in"}
                </button>
                <button type='button' onClick={signInWithGoogle}>
                    Google Sign In
                </button>
            </Form>
        </div>
    )
}