import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Form, useNavigate } from 'react-router-dom'
import { IoMenuOutline } from "react-icons/io5";

import Avatar from '../../components/Avatar'

import { UserContext } from '../../contexts/User.context'
import useRentModal from '../../hooks/useRentModal'

const UserMenu = () => {
    const { currentUser } = useContext(UserContext)
    const navigate = useNavigate()
    const rentModal = useRentModal()

    const onRent = useCallback(async() => {
        if(!currentUser) {
            return navigate('/login?message=You must log in first.')
        }

        toggleMenu()
        rentModal.onOpen()
    }, [currentUser, rentModal])

    const [isOpenMenuDropdown, setIsOpenMenuDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    

    const toggleMenu = useCallback(() => {
        setIsOpenMenuDropdown((value) => !value)
    }, [])

    const handleClickOutSide = (e: MouseEvent) => {
        const { target } = e;
        if (target instanceof Node && dropdownRef.current?.contains(target)) {
            return;
        }
        
        setIsOpenMenuDropdown(false);
    };

    useEffect(() => {
        if(isOpenMenuDropdown) {
            window.addEventListener('click', handleClickOutSide);
        }

    }, [isOpenMenuDropdown]);

  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div
                onClick={onRent}
                className='
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    bg-[#FFEAD1]
                    text-black
                    hover:bg-primary-color
                    hover:text-white
                    hover:border-primary-color
                    transition
                    cursor-pointer
                '
            >
                Host your Van
            </div>
            <NavLink 
                    to="host"
                    className={({isActive}) => (isActive ? 'active-link ' : '') + 'hidden md:block'}
            >
                Host
            </NavLink>
            <NavLink 
                to="vans" 
                className={({isActive}) => (isActive ? 'active-link ' : '') + 'hidden md:block' }
            >
                Vans
            </NavLink>
            {/* <NavLink 
                to="about" 
                className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                About
            </NavLink> */}
            <div ref={dropdownRef}>
                <div 
                    onClick={toggleMenu}
                    className='
                        py-1
                        px-1
                        border-[1px]
                        border-neutral-400
                        bg-white
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                        flex-shrink-0
                    '
                >
                    { currentUser ? <Avatar /> : <IoMenuOutline size={25} /> }
                </div>
                { isOpenMenuDropdown && (
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
                        {currentUser ? (
                            <>
                                <NavLink 
                                    to="host"
                                    className={({isActive}) => (isActive ? 'active-link ' : '') + 'block md:hidden px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                    onClick={toggleMenu}
                                >
                                    Host
                                </NavLink>
                                <NavLink 
                                    to="vans" 
                                    className={({isActive}) => (isActive ? 'active-link ' : '') + 'block md:hidden px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                    onClick={toggleMenu}
                                >
                                    Vans
                                </NavLink>
                                <NavLink
                                    to="trips"
                                    className={({isActive}) => (isActive ? 'active-link ' : '') + 'px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                    onClick={toggleMenu}
                                >
                                    My Trips
                                </NavLink>
                                <NavLink
                                    to="favorites"
                                    className={({isActive}) => (isActive ? 'active-link ' : '') + 'px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                    onClick={toggleMenu}
                                >
                                    My Favorites
                                </NavLink>
                                <button onClick={onRent} className='w-full text-start px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'>Host your Van</button>
                                <hr/>
                                <Form method='post' action='logout'>
                                    <button
                                        type='submit'
                                        className='w-full text-start px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'
                                    >
                                        Logout
                                    </button>
                                </Form>
                            </>
                            ) : (
                                <>
                                    <NavLink 
                                        to="host"
                                        className={({isActive}) => (isActive ? 'active-link ' : '') + ' block md:hidden px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                        onClick={toggleMenu}
                                    >
                                        Host
                                    </NavLink>
                                    <NavLink 
                                        to="vans" 
                                        className={({isActive}) => (isActive ? 'active-link ' : '') + ' block md:hidden px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                        onClick={toggleMenu}
                                    >
                                        Vans
                                    </NavLink>
                                    <hr/>
                                    <NavLink
                                        to="login"
                                        className={({isActive}) => (isActive ? 'active-link ' : '') + '  px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                        onClick={toggleMenu}
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="sign-up"
                                        className={({isActive}) => (isActive ? 'active-link ' : '') + 'px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                        onClick={toggleMenu}
                                    >
                                        Sign Up
                                    </NavLink>
                                </>
                            )
                        }
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default UserMenu