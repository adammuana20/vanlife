import { useCallback, useContext, useState } from 'react'
import Avatar from '../../components/Avatar'
import { NavLink, Form, useNavigate } from 'react-router-dom'
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

        rentModal.onOpen()
    }, [currentUser, rentModal])

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])
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
                    className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                Host
            </NavLink>
            <NavLink 
                to="vans" 
                className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                Vans
            </NavLink>
            <NavLink 
                to="about" 
                className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                About
            </NavLink>
            <div 
                onClick={toggleOpen}
                className='
                    p-4
                    md:py-1
                    md:px-2
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
                '
            >
                <Avatar />
            </div>
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
                    {currentUser ? (
                        <>
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
                            <div
                                className='
                                    px-4
                                    py-3
                                    hover:bg-neutral-100
                                    font-semibold
                                '
                            >
                                <NavLink
                                    to="favorites"
                                    className={({isActive}) => isActive ? 'active-link' : undefined}
                                >
                                    My Favorites
                                </NavLink>
                            </div>
                            <div
                                className='
                                    px-4
                                    py-3
                                    hover:bg-neutral-100
                                    font-semibold
                                '
                            >
                                <button onClick={onRent} className='text-dark-gray hover:text-semi-black' >Host your Van</button>
                            </div>
                            <div
                                className='
                                    px-4
                                    py-3
                                    hover:bg-neutral-100
                                    font-semibold
                                    text-dark-gray 
                                    hover:text-semi-black
                                '
                            >
                                <Form method='post' action='logout' className='flex'>
                                    <button
                                        type='submit'
                                    >
                                        Logout
                                    </button>
                                </Form>
                            </div>
                        </>
                        ) : (
                            <>
                                <div
                                    className='
                                        px-4
                                        py-3
                                        hover:bg-neutral-100
                                        font-semibold
                                        text-dark-gray 
                                        hover:text-semi-black
                                    '
                                >
                                    <NavLink
                                        to="login"
                                        className={({isActive}) => isActive ? 'active-link' : undefined}
                                    >
                                        Login
                                    </NavLink>
                                </div>
                                <div
                                    className='
                                        px-4
                                        py-3
                                        hover:bg-neutral-100
                                        font-semibold
                                        text-dark-gray 
                                        hover:text-semi-black
                                    '
                                    >
                                    <NavLink
                                        to="sign-up"
                                        className={({isActive}) => isActive ? 'active-link' : undefined}
                                    >
                                        Sign Up
                                    </NavLink>
                                </div>
                            </>
                        )
                    }
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default UserMenu