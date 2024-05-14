import { Link } from "react-router-dom";

import Search from './Search';
import UserMenu from './UserMenu';

import vanImg from '../../assets/images/van.png'

const MainHeader = () => {
    return (
        <header className='flex flex-row items-center justify-between gap-3 md:gap-0 flex-shrink-0'>
            <Link className="text-black uppercase font-black text-2xl hover:underline hover:font-black flex-shrink-0" to="/">
                <img src={vanImg} width={45} />
            </Link>
            <Search />
            <UserMenu />
        </header>
    )
}

export default MainHeader