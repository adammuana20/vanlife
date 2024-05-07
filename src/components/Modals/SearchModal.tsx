import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { formatISO } from 'date-fns'
import qs from 'query-string'
import Loadable from 'react-loadable-visibility/loadable-components'

import Modal from './Modal'
import CountrySelect, { CountrySelectValue } from '../Inputs/CountrySelect'
import Heading from '../Heading'
import Counter from '../Inputs/Counter'
import Calendar from '../Calendar'

import useSearchModal from '../../hooks/useSearchModal'

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const searchModal = useSearchModal()

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [capacityCount, setCapacityCount] = useState(1)
    const [bedCount, setBedCount] = useState(0)
    const [bathroomCount, setBathroomCount] = useState(0)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

    const Map = useMemo(() => Loadable(() => import('../Map'), {
        ssr: false,
    }), [location])

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if(step !== STEPS.INFO) {
            return onNext()
        }

        let currentQuery = {}

        if(searchParams) {
            currentQuery = qs.parse(searchParams.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            location: location?.value,
            capacityCount,
            bedCount,
            bathroomCount,
        }

        if(dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if(dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/vans',
            query: updatedQuery
        }, { skipNull: true })

        navigate(url)
        searchModal.onClose()
        setStep(STEPS.LOCATION)
        
    }, [
        step,
        searchModal,
        location,
        capacityCount,
        bedCount,
        bathroomCount,
        dateRange,
        onNext,
        searchParams,
    ])

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back';
    }, [step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
                title='Where do you wanna go?'
                subtitle='Find the perfect van!'
            />
            <CountrySelect 
                value={location}
                onChange={(value) => 
                    setLocation(value as CountrySelectValue)
                }
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if(step === STEPS.DATE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='When do you plan to rent?'
                    subtitle='Make sure everyone is free!'
                />
                <Calendar 
                    dateRange={dateRange}
                    onChangeDate={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='More Information'
                    subtitle='Find your perfect van!'
                />
                <Counter
                    title='Capacity'
                    subtitle='How many are coming?'
                    value={capacityCount}
                    onChange={(value) => setCapacityCount(value)}
                />
                <Counter
                    title='Bed'
                    subtitle='How many beds do you need?'
                    value={bedCount}
                    onChange={(value) => setBedCount(value)}
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you need?'
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }

  return (
    <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel}
        body={bodyContent}
    />
  )
}

export default SearchModal