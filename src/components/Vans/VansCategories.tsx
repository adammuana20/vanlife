import { FC, useState } from 'react';
import { useAsyncValue } from 'react-router-dom'

import { capitalizeEachWord } from '../../utils/helpers'
import { Van } from '../../utils/firebase';
import { useCategories } from '../../contexts/Categories.context';

type VansCategoriesProps = {
    handleFilterChange: (key: string, value: string) => void;
    typeFilter: string | null;
}

const VansCategories: FC<VansCategoriesProps> = ({ handleFilterChange, typeFilter }) => {
    const data = useAsyncValue() as [Van[]]

    const [vans] = data
    const [hoveredButton, setHoveredButton] = useState<number | null>(null)
    const { categoriesColor } = useCategories()
    

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

    const calcHSLColor = (type: string, idx: number) => {       
        if (hoveredButton === idx && type === categoriesColor[idx].type || typeFilter === type) {
            return {
                backgroundColor: categoriesColor[idx].color,
                color: '#fff',
            }
        } else {
            return {
                backgroundColor: 'hsl(33, 100%, 91%)',
                color: '#4d4d4d',
            }
        }
    }

    return (
        <>
            <h2 className='text-center md:text-start'>Explore our van options</h2>
            <div className="flex flex-wrap justify-center">
                { vanType.map((type: string, idx: number) => {
                    return (
                        <button 
                            key={idx}
                            onClick={() => handleFilterChange("type", type)}
                            className={`text-sm not-italic font-medium border-none rounded transition-all duration-200 ease-in-out mr-5 py-2 px-5 hover:text-white`}
                            onMouseEnter={() => mouseHover(idx)}
                            onMouseLeave={mouseLeave}
                            style={calcHSLColor(type, idx)}
                        >
                            {capitalizeEachWord(type)}
                        </button>
                    )
                })}
                { typeFilter ? (
                    <button 
                        onClick={() => handleFilterChange("type", '')}
                        className="text-sm hover:underline text-dark-gray"
                    >Clear Category</button>
                    ) : null
                }
            </div>
        </>
    )
}

export default VansCategories