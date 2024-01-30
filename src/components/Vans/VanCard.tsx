import { Link } from "react-router-dom"
import { Van } from "../../utils/firebase"
import { FC } from "react";

type VanCardProps = {
    van: Van;
    searchParams: URLSearchParams;
    typeFilter: string | null;
}

const VanCard: FC<VanCardProps> = ({ van, searchParams, typeFilter }) => {
    return (
        <div>
            <Link 
                to={van.id} 
                state={{ 
                    search: `?${searchParams.toString()}`, 
                    type: typeFilter
                }}
                className="text-semi-dark"
            >
                <img src={van.imageUrl} className="rounded" />
                <div>
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
  )
}

export default VanCard