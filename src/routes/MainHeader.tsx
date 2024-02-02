import { useContext } from 'react'
import { NavLink, Link, useNavigate, Form, useActionData } from "react-router-dom";

import { UserContext } from '../contexts/User.context';

import imageUrl from "../assets/images/avatar-icon.png";


const MainHeader = () => {
    const { currentUser } = useContext(UserContext)    

    return (
        <header>
            <Link className="text-black mr-auto uppercase font-black text-2xl px-2 py-2.5 hover:underline hover:font-black" to="/">#VanLife</Link>
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
                        <img src={imageUrl} className="h-5 w-5" />
                        <Form method='post' action='logout' className='flex'>
                            <button
                                type='submit'
                                className='text-[#4d4d4d] font-semibold px-3 py-2.5 hover:text-[#161616] hover:underline hover:font-semibold'
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