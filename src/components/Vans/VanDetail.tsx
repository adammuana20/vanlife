import { useAsyncValue } from 'react-router-dom'

import { useCategories } from '../../contexts/Categories.context'

import { Van } from '../../utils/firebase'
import { getCategoryColor } from '../../utils/helpers'

const VanDetail = () => {
    const van = useAsyncValue() as Van

    const { name, description, price, imageUrl, type } = van

    const { categoriesColor } = useCategories()
    
    return (
        <div className="flex flex-col mt-5">
            <img src={imageUrl} />
            <i className={`text-sm font-medium border-none rounded transition-all duration-200 ease-in-out mr-5 py-2 px-5 text-white self-start mt-10`} style={{ backgroundColor: `${getCategoryColor(categoriesColor, type)}` }}>{type}</i>
            <h2>{name}</h2>
            <p className="font-bold text-xl my-0"><span>${price}</span>/day</p>
            <p>{description}</p>
            <button className="link-button bg-primary-color">Rent this van</button>
        </div>
    )
}

export default VanDetail