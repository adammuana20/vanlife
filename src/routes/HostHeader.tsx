import { NavLink } from 'react-router-dom'

const HostHeader = () => {
    return (
        <nav className="flex mb-8 items-center gap-3 pt-5">
            <NavLink to="." 
                end 
                className={({isActive}) => isActive ? 'active-link' : ''}
            >
                Dashboard
            </NavLink>
            <NavLink 
                to="income" 
                className={({isActive}) => isActive ? 'active-link' : ''}
            >
                Income
            </NavLink>
            <NavLink 
                to="vans" 
                className={({isActive}) => isActive ? 'active-link' : ''}
            >
                Vans
            </NavLink>
            {/* <NavLink 
                to="reviews" 
                className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                Reviews
            </NavLink> */}
        </nav>
    )
}

export default HostHeader