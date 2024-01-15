import { useContext } from 'react'
import { NavLink, Link, useNavigate, Form, useActionData } from "react-router-dom";

import { UserContext } from '../contexts/User.context';

import { signOutUser } from '../utils/firebase';

import imageUrl from "../assets/images/avatar-icon.png";

export const action = async () => {
    await signOutUser()
    const pathname = '/login' 
    return pathname
}

const MainHeader = () => {
    const { currentUser } = useContext(UserContext)
    const navigate = useNavigate()
    const action = useActionData()

    if(action) {
        navigate(action, { replace: true })
    }

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink 
                    to="host" 
                    className={({isActive}) => isActive ? 'active-link' : null}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="about" 
                    className={({isActive}) => isActive ? 'active-link' : null}
                >
                    About
                </NavLink>
                <NavLink 
                    to="vans" 
                    className={({isActive}) => isActive ? 'active-link' : null}
                >
                    Vans
                </NavLink>
                {currentUser ? (
                    <>
                        <img src={imageUrl} className="login-icon" />
                        <Form method='post' action='logout'>
                            <button
                                type='submit'
                            >
                                Logout
                            </button>
                        </Form>
                    </>
                    ) : (
                        <>
                            <NavLink
                                to="login"
                                className={({isActive}) => isActive ? 'active-link' : null}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="sign-up"
                                className={({isActive}) => isActive ? 'active-link' : null}
                            >
                                Sign Up
                            </NavLink>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default MainHeader