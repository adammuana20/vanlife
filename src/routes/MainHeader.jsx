import { NavLink, Link } from "react-router-dom";
import imageUrl from "../assets/images/avatar-icon.png";

const MainHeader = () => {

    const fakeLogOut = () => {
        localStorage.removeItem("loggedin")
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
                <Link
                    to="login"
                >
                    <img src={imageUrl} className="login-icon" />
                </Link>
                <Link
                to="sign-up"
                >
                    Sign Up
                </Link>
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
}

export default MainHeader