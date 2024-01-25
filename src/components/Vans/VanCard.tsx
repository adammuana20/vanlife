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
        <div key={van.id} className="van-tile">
            <Link 
                to={van.id} 
                state={{ 
                    search: `?${searchParams.toString()}`, 
                    type: typeFilter 
                }}
            >
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
  )
}

export default VanCard