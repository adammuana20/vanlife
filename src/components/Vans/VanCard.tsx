import { FC } from "react";
import { Link } from "react-router-dom"

import { Van } from "../../utils/firebase"

import { useCategories } from "../../contexts/Categories.context";
import { getCategoryColor } from "../../utils/helpers";

type VanCardProps = {
    van: Van;
    searchParams: URLSearchParams;
    typeFilter: string | null;
}

const VanCard: FC<VanCardProps> = ({ van, searchParams, typeFilter }) => {
    const { categoriesColor } = useCategories()

    const { name, price, imageUrl, id, type } = van
    
    return (
        <div>
            <Link 
                to={id} 
                state={{ 
                    search: `?${searchParams.toString()}`, 
                    type: typeFilter
                }}
                className="text-semi-dark group"
            >
                <img src={imageUrl} className="rounded" />
                <div>
                    <h3>{name}</h3>
                    <p>${price}<span>/day</span></p>
                </div>
                <i 
                    className={`text-sm font-medium border-none rounded transition-all duration-200 ease-in-out mr-5 py-2 px-5 text-white`} 
                    style={{backgroundColor: `${getCategoryColor(categoriesColor, type)}`}}
                >
                    {type}
                </i>
            </Link>
        </div>
  )
}

export default VanCard