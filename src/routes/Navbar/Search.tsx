import { BiSearch } from 'react-icons/bi'
import useSearchModal from '../../hooks/useSearchModal'
import { useSearchParams } from 'react-router-dom'
import useCountries from '../../hooks/useCountries'
import { useMemo } from 'react'
import { differenceInDays } from 'date-fns'

const Search = () => {
    const searchModal = useSearchModal()
    const [searchParams, setSearchParams] = useSearchParams()
    const { getByValue } = useCountries()

    const locationValue = searchParams?.get('location')
    const startDate = searchParams?.get('startDate')
    const endDate = searchParams?.get('endDate')
    const capacityCount = searchParams?.get('capacityCount')

    const locationLabel = useMemo(() => {
        if(locationValue) {
            return getByValue(locationValue as string)?.label
        }
        return 'Anywhere'
    }, [getByValue, locationValue])

    const durationLabel = useMemo(() => {
        if(startDate && endDate) {
            const start = new Date(startDate as string)
            const end = new Date(endDate as string)
            let diff = differenceInDays(end, start);

            if(diff === 0) {
                diff = 1
            }

            return `${diff} Days`
        }

        return 'Any Week'
    }, [startDate, endDate])

    const capacityLabel = useMemo(() => {
        if(capacityCount) {
            return `${capacityCount} Capacity`
        }
        return 'Add Capacity'
    }, [capacityCount])

  return (
    <div
        onClick={searchModal.onOpen}
        className='
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer
            border-neutral-400
            bg-white
        '
    >
        <div
            className='
                flex
                flex-row
                items-center
                justify-between
            '
        >
            <div
                className='
                    text-sm
                    font-semibold
                    px-6
                '
            >
                {locationLabel}
            </div>
            <div
                className='
                    hidden
                    sm:block
                    text-sm
                    font-semibold
                    px-6
                    border-x-[1px]
                    border-neutral-400
                    flex-1
                    text-center
                '
            >
                {durationLabel}
            </div>
            <div 
                className='
                    text-sm
                    pl-6
                    pr-2
                    text-gray-600
                    flex
                    flex-row
                    items-center
                    gap-3
                '
            >
                <div className='hidden sm:block'>{capacityLabel}</div>
                <div 
                    className='
                        p-2
                        bg-primary-color
                        rounded-full
                        text-white
                    '
                >
                    <BiSearch size={18} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search