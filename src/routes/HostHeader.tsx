import { NavLink } from 'react-router-dom'

const HostHeader = () => {
    return (
        <nav className="flex mb-8 items-center gap-3">
            <NavLink to="." 
                end 
                className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                Dashboard
            </NavLink>
            <NavLink 
                to="income" 
                className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                Income
            </NavLink>
            <NavLink 
                to="vans" 
                className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                Vans
            </NavLink>
            <NavLink 
                to="reviews" 
                className={({isActive}) => isActive ? 'active-link' : undefined}
            >
                Reviews
            </NavLink>
        </nav>
    )
}

export default HostHeader