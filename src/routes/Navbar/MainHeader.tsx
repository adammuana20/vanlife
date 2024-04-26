import { useCallback, useContext, useState } from 'react'
import { NavLink, Link, useNavigate, Form } from "react-router-dom";

import { UserContext } from '../../contexts/User.context';

import useRentModal from '../../hooks/useRentModal';
import Search from './Search';
import Avatar from '../../components/Avatar';
import UserMenu from './UserMenu';

const MainHeader = () => {
    // const { currentUser } = useContext(UserContext)
    // const navigate = useNavigate()
    // const rentModal = useRentModal()

    // const onRent = useCallback(() => {
    //     if(!currentUser) {
    //         return navigate('/login')
    //     }

    //     rentModal.onOpen()
    // }, [currentUser, rentModal])

    return (
        <header className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Link className="text-black uppercase font-black text-2xl px-2 py-2.5 hover:underline hover:font-black" to="/">#VanLife</Link>
            <Search />
            <UserMenu />
            {/* <nav>
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
                <button onClick={onRent}>Register your Van</button>
                {currentUser ? (
                    <>
                        <NavLink
                            to="trips"
                            className={({isActive}) => isActive ? 'active-link' : undefined}
                        >
                            My Trips
                        </NavLink>
                        <NavLink
                            to="favorites"
                            className={({isActive}) => isActive ? 'active-link' : undefined}
                        >
                            My Favorites
                        </NavLink>
                        { isOpen && (
                            <div
                                className='
                                    absolute
                                    rounded-xl
                                    shadow-md
                                    w-[40vw]
                                    md:w-3/4
                                    bg-white
                                    overflow-hidden
                                    right-0
                                    top-12
                                    text-sm
                                '
                            >
                                <div className='flex flex-col cursor-pointer'>
                                    <div
                                        className='
                                            px-4
                                            py-3
                                            hover:bg-neutral-100
                                            font-semibold
                                        '
                                    >
                                        <NavLink
                                            to="trips"
                                            className={({isActive}) => isActive ? 'active-link' : undefined}
                                        >
                                            My Trips
                                        </NavLink>
                                    </div>

                                </div>
                            </div>
                        )}
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
            </nav> */}
        </header>
    )
}

export default MainHeader