import { useContext } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";

import { UserContext } from '../contexts/User.context';

import { signOutUser } from '../utils/firebase';

import imageUrl from "../assets/images/avatar-icon.png";

const MainHeader = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()

    const signOutHandler = async () => {
        await signOutUser()
        setCurrentUser(null)
        navigate('login')
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
                        <span
                            onClick={signOutHandler}
                        >
                            Logout
                        </span>
                    ) : (
                        <>
                            <Link
                                to="login"
                            >
                                Login
                            </Link>
                            <Link
                                to="sign-up"
                            >
                                Sign Up
                            </Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default MainHeader

// <img src={imageUrl} className="login-icon" />