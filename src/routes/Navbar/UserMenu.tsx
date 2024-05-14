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
                    className={({isActive}) => isActive ? 'active-link hidden md:block' : 'hidden md:block'}
            >
                Host
            </NavLink>
            <NavLink 
                to="vans" 
                className={({isActive}) => isActive ? 'active-link hidden md:block' : 'hidden md:block'}
            >
                Vans
            </NavLink>
            {/* <NavLink 
                to="about" 
                className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                About
            </NavLink> */}
            <div 
                onClick={toggleOpen}
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
                            <NavLink 
                                to="host"
                                className={({isActive}) => (isActive ? 'active-link' : undefined) + ' block md:hidden px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                            >
                                Host
                            </NavLink>
                            <NavLink 
                                to="vans" 
                                className={({isActive}) => (isActive ? 'active-link' : undefined) + ' block md:hidden px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                            >
                                Vans
                            </NavLink>
                            <NavLink
                                to="trips"
                                className={({isActive}) => (isActive ? 'active-link' : undefined) + ' px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                            >
                                My Trips
                            </NavLink>
                            <NavLink
                                to="favorites"
                                className={({isActive}) => (isActive ? 'active-link' : undefined) + ' px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
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
                                    className={({isActive}) => (isActive ? 'active-link' : undefined) + ' px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                >
                                    Host
                                </NavLink>
                                <NavLink 
                                    to="vans" 
                                    className={({isActive}) => (isActive ? 'active-link' : undefined) + ' px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                >
                                    Vans
                                </NavLink>
                                <NavLink
                                    to="login"
                                    className={({isActive}) => (isActive ? 'active-link' : undefined) + ' px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="sign-up"
                                    className={({isActive}) => (isActive ? 'active-link' : undefined) + ' px-4 py-3 hover:bg-neutral-100 font-semibold text-dark-gray hover:text-semi-black'}
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
  )
}

export default UserMenu