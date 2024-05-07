import { Link } from "react-router-dom";

import Search from './Search';
import UserMenu from './UserMenu';

const MainHeader = () => {
    return (
        <header className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Link className="text-black uppercase font-black text-2xl px-2 py-2.5 hover:underline hover:font-black" to="/">#VanLife</Link>
            <Search />
            <UserMenu />
        </header>
    )
}

export default MainHeader