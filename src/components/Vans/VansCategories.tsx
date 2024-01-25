import { FC } from 'react';
import { useAsyncValue } from 'react-router-dom'

import { capitalizeEachWord } from '../../utils/helpers'
import { Van } from '../../utils/firebase';

type VansCategoriesProps = {
    handleFilterChange: (key: string, value: string) => void;
    typeFilter: string | null;
}

const VansCategories: FC<VansCategoriesProps> = ({ handleFilterChange, typeFilter }) => {
    const vans = useAsyncValue() as Van[]

    const vanType = vans.reduce((acc: string[], currVal: Van) => {
        if(!acc.includes(currVal.type)) {
            acc.push(currVal.type.toLowerCase())
        }
        return acc
    }, [])
 
    return (
        <div className="van-list-filter-buttons">
            { vanType.map((type: string, idx: number) => (
                <button 
                    key={idx}
                    onClick={() => handleFilterChange("type", type)}
                    className={`van-type ${type} ${typeFilter === type ? "selected" : ""}`}
                >
                    {capitalizeEachWord(type)}
                </button>
            ))}
            { typeFilter ? (
                <button 
                    onClick={() => handleFilterChange("type", '')}
                    className="van-type clear-filters"
                >Clear Filter</button>
                ) : null
            }
        </div>
    )
}

export default VansCategories