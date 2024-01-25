import { useContext } from 'react'
import { NavLink, Link, useNavigate, Form, useActionData } from "react-router-dom";

import { UserContext } from '../contexts/User.context';

import imageUrl from "../assets/images/avatar-icon.png";



const MainHeader = () => {
    const { currentUser } = useContext(UserContext)    

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink 
                    to="host" 
                    className={({isActive}) => isActive ? 'active-link' : undefined}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="about" 
                    className={({isActive}) => isActive ? 'active-link' : undefined}
                >
                    About
                </NavLink>
                <NavLink 
                    to="vans" 
                    className={({isActive}) => isActive ? 'active-link' : undefined}
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
                                className={({isActive}) => isActive ? 'active-link' : undefined}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="sign-up"
                                className={({isActive}) => isActive ? 'active-link' : undefined}
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