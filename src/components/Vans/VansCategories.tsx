import { FC, useState } from 'react';
import { useAsyncValue } from 'react-router-dom'

import { capitalizeEachWord } from '../../utils/helpers'
import { Van } from '../../utils/firebase';

type VansCategoriesProps = {
    handleFilterChange: (key: string, value: string) => void;
    typeFilter: string | null;
}

const VansCategories: FC<VansCategoriesProps> = ({ handleFilterChange, typeFilter }) => {
    const vans = useAsyncValue() as Van[]
    const [hoveredButton, setHoveredButton] = useState<number | null>(null)

    const vanType = vans.reduce((acc: string[], currVal: Van) => {
        if(!acc.includes(currVal.type)) {
            acc.push(currVal.type.toLowerCase())
        }
        return acc
    }, [])

    const mouseHover = (idx: number) => {
        setHoveredButton(idx)
    }

    const mouseLeave = () => {
        setHoveredButton(null)
    }

    const calcHSLColor = (idx: number) => {
        if (hoveredButton === idx) {
            return `hsl(${20 * idx}, 50%, ${idx === 0 ? 0 : 50}%)`
        } else {
            return `hsl(33, 100%, 91%)`;
        }
    }


 
    return (
        <div className="flex flex-wrap justify-center">
            { vanType.map((type: string, idx: number) => (
                <button 
                    key={idx}
                    onClick={() => handleFilterChange("type", type)}
                    className={`text-sm not-italic font-medium border-none rounded text-dark-gray transition-all duration-200 ease-in-out mr-5 py-2 px-5 hover:text-white
                    ${typeFilter === type ? "selected" : ""}`}
                    onMouseEnter={() => mouseHover(idx)}
                    onMouseLeave={mouseLeave}
                    style={{ backgroundColor: `${calcHSLColor(idx)}` }}
                >
                    {capitalizeEachWord(type)}
                </button>
            ))}
            { typeFilter ? (
                <button 
                    onClick={() => handleFilterChange("type", '')}
                    className="text-sm hover:underline text-dark-gray"
                >Clear Filter</button>
                ) : null
            }
        </div>
    )
}

export default VansCategories