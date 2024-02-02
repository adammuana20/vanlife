import { useAsyncValue, NavLink, Outlet } from 'react-router-dom'

import { useCategories } from '../../contexts/Categories.context'

import { Van } from '../../utils/firebase'
import { getCategoryColor } from '../../utils/helpers'


const HostVanDetail = () => {
    const currentVan = useAsyncValue() as Van
    const { categoriesColor } = useCategories()
    const { imageUrl, type, name, price } = currentVan

    return(
        <div className="bg-white p-6 my-8 mx-6">
            <div className="flex items-center">
                <img src={imageUrl} className='rounded mr-5 h-40' />
                <div>
                    <i 
                    className={`text-sm font-medium border-none rounded transition-all duration-200 ease-in-out mr-5 py-2 px-5 text-white van-type-${type}`}
                    style={{backgroundColor: `${getCategoryColor(categoriesColor, type)}`}}
                    >
                        {type}
                    </i>
                    <h3 className='mt-6 mb-1 font-bold'>{name}</h3>
                    <h4 className='mb-0'>{price}</h4>
                </div>
            </div>
        

            <nav className="flex">
                <NavLink 
                    to="." 
                    end 
                    className={({isActive}) => isActive ? 'active-link' : undefined}
                >
                    Details
                </NavLink>
                <NavLink 
                    to={"pricing"} 
                    className={({isActive}) => isActive ? 'active-link' : undefined}
                >
                    Pricing
                </NavLink>
                <NavLink 
                    to={"photos"} 
                    className={({isActive}) => isActive ? 'active-link' : undefined}
                >
                    Photos
                </NavLink>
            </nav>
            <Outlet context={{ currentVan }} />
        </div>
    )
}

export default HostVanDetail