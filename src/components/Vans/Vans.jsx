import React from "react";
import { 
    Link, 
    useSearchParams, 
    useLoaderData, 
    defer,
    Await
} from "react-router-dom";
import { getVans } from "../../utils/firebase"
import { capitalizeEachWord } from "../../utils/helpers";

export function loader() {
    return defer({ vans: getVans() })
}


export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams();
    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get("type");

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if(value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function renderVanElements(vans) {
            const displayVans = typeFilter
                ? vans.filter(van => van.type.toLowerCase() === typeFilter)
                : vans
                
            const vanElements = displayVans.map(van => (
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
            ))


            const vanType = vans.reduce((acc, currVal) => {
                if(!acc.includes(currVal.type)) {
                    acc.push(currVal.type.toLowerCase())
                }
                return acc
            }, [])

            const displayVanType = vanType.map((type, idx) => (
                <button 
                    key={idx}
                    onClick={() => handleFilterChange("type", type)}
                    className={`van-type ${type} ${typeFilter === type ? "selected" : ""}`}
                >
                    {capitalizeEachWord(type)}
                </button>
            ))
            

        return (
            <>
                <div className="van-list-filter-buttons">
                    {displayVanType}
                    { typeFilter ? (
                        <button 
                            onClick={() => handleFilterChange("type", null)}
                            className="van-type clear-filters"
                        >Clear Filter</button>
                        ) : null
                    }
                </div>
                <div className="van-list">
                    {vanElements}
                </div>
            </>
        )
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <React.Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
           </React.Suspense>
        </div>
    )
}