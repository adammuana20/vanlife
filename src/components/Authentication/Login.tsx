import { 
    useLoaderData, 
    Form, 
    useNavigation,
    NavLink,
} from "react-router-dom";

import { 
    signInWithGithubPopup,
    signInWithGooglePopup,
} from "../../utils/firebase"
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc'

import Button from "../Button";

const Login = () => {    
    const navigation = useNavigation();
    
    return (
        <div className="auth-container">
            <h2 className="text-center">Already have an account?</h2>
            <span>Sign in to your account</span>
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