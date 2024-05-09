import { 
    useLoaderData, 
    Form, 
    useNavigation,
    NavLink,
} from "react-router-dom";
import { toast } from "react-toastify";

import { 
    signInAuthUserWithEmailAndPassword,
    signInWithGithubPopup,
    signInWithGooglePopup,
} from "../../utils/firebase"

import Button from "../Button";

import { noAuthRequire } from "../../utils/loaders";
import { User } from "firebase/auth";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc'


export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
        return signInAuthUserWithEmailAndPassword(email, password)
            .then(() => {
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

export const Login = () => {
    const loaderMessage = useLoaderData();
    const message: React.ReactNode = typeof loaderMessage === 'string' ? loaderMessage : null;
    
    const navigation = useNavigation();

    return (
        <div className="auth-container">
            <h2>Already have an account?</h2>
            <span>Sign in to your account</span>
            { message && <h3 className="text-dark-red">{message}</h3> }
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
                <div className="mt-8">
                    <Button
                        label='Log In'
                        disabled={navigation.state === 'submitting'}
                        disabledLabel="Loggin in..."
                        type="submit"
                    />
                </div>
                <div className="text-center mt-8">
                    Don't have an account? <NavLink to='/sign-up' className="text-primary-color">Create an account.</NavLink>
                </div>
                <div className="flex items-center justify-center my-2">
                    <div className="flex-1 text-dark-gray h-px bg-light-gray"></div>
                    <div className="px-4">or</div>
                    <div className="flex-1 text-dark-gray h-px bg-light-gray"></div>
                </div>
                <div className="flex gap-4 flex-col">
                    <Button
                        label='Login with Google'
                        onClick={signInWithGooglePopup}
                        icon={FcGoogle}
                        disabled={navigation.state === 'submitting'}
                        outline
                    />
                    <Button
                        label='Login with Github'
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

export default Login