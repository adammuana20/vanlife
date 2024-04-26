import Loadable from 'react-loadable-visibility/loadable-components'

import useCountries from "../../hooks/useCountries"
import { useCategories } from "../../contexts/Categories.context"
import { getCategoryColor } from "../../utils/helpers"


const Map = Loadable(() => import('../Map'), {
    ssr: false
})

type VanInfoProps = {
    user?: string
    type: string
    description: string
    capacityCount: number
    bathroomCount: number
    bedroomCount: number
    locationValue: string
}

const VanInfo: React.FC<VanInfoProps> = ({
    user,
    type,
    description,
    capacityCount,
    bathroomCount,
    bedroomCount,
    locationValue,
}) => {
    const { getByValue } = useCountries()
    const { categoriesColor } = useCategories()

    const coordinates = getByValue(locationValue)?.latlng    

  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div
                className="
                    text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                "
            >
                <div>Hosted by { user }</div>
                {/* AVATAR */}
            </div>
            <div
                className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    font-light
                    text-neutral-500
                "
            >
                <div>
                    {capacityCount} Capacity
                </div>
                { bedroomCount ?
                    <div>
                        {bedroomCount} Bed
                    </div>
                    : null
                }
                { bathroomCount ?
                    <div>
                        {bathroomCount} Bathroom
                    </div>
                    : null
                }
            </div>
            <i 
                className={`
                    text-sm 
                    font-medium 
                    border-none 
                    rounded 
                    transition-all 
                    duration-200 
                    ease-in-out 
                    mr-5 
                    py-2 
                    px-5 
                    text-white 
                    self-start 
                `} 
                style={{ backgroundColor: `${getCategoryColor(categoriesColor, type)}` }}
            >
                {type}
            </i>
        </div>
        <hr/>
        <div className='text-lg font-light text-neutral-500'>
            {description}
        </div>
        <hr/>
        <Map center={coordinates}/>
    </div>
  )
}

export default VanInfo