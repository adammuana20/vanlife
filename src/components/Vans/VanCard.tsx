import { FC } from "react";
import { Link } from "react-router-dom"

import { Van } from "../../utils/firebase"

import { useCategories } from "../../contexts/Categories.context";
import { getCategoryColor } from "../../utils/helpers";
import FavoritesButton from "../Favorites/FavoritesButton";

type VanCardProps = {
    van: Van;
    searchParams: URLSearchParams;
    typeFilter: string | null;
}

const VanCard: FC<VanCardProps> = ({ van, searchParams, typeFilter }) => {
    const { categoriesColor } = useCategories()

    const { name, price, imageUrl, id, type } = van
    
    return (
        <div className="relative">
            <div className="absolute top-3 right-3">
                <FavoritesButton van={van}/>
            </div>
            <Link 
                to={`/vans/${id}`} 
                state={{ 
                    search: `?${searchParams.toString()}`, 
                    type: typeFilter
                }}
                className="text-semi-dark group"
            >
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <img src={imageUrl} className="rounded transition group-hover:scale-110" />
                </div>
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