import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useState, useEffect, useMemo } from 'react'
import { Range } from 'react-date-range'
import { useAsyncValue, useNavigate } from 'react-router-dom'

import VanHead from './VanHead'
import VanReservation from './VanReservation'

import { Favorite, Reservation, Van, createReservationDocumentOfUser } from '../../utils/firebase'
import { useUser } from '../../contexts/User.context'
import VanInfo from './VanInfo'
import { toast } from 'react-toastify'
import NoState from '../NoState'
import Heading from '../Heading'

const defaultDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

const VanDetail = () => {
    const data = useAsyncValue()
    const [van, reservations, favorite] = data as [Van, Reservation[], Favorite]   

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    
    const { currentUser } = useUser()

    const [dateRange, setDateRange] = useState<Range>(defaultDateRange)
    const [totalPrice, setTotalPrice] = useState(0)
    
    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            )

            if(dayCount && van.price) {
                setTotalPrice(dayCount * van.price)
            } else {
                setTotalPrice(van.price)
            }
        }
    }, [dateRange, van.price])

    const disabledDates = useMemo(() => {
        let dates: Date[] = []
        
        reservations.forEach((reservation) => {           
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate.seconds * 1000 + reservation.startDate.nanoseconds/1000000),
                end: new Date(reservation.endDate.seconds * 1000 + reservation.endDate.nanoseconds/1000000)
            })
            
            dates = [...dates, ...range]
        })

        return dates
    }, [reservations])


    const onCreateReservation = () => {
        if(!currentUser) {
            return navigate('/login')
        }
        
        if(dateRange.startDate && dateRange.endDate) {
                setIsLoading(true)
                createReservationDocumentOfUser(dateRange.startDate, dateRange.endDate, van, totalPrice)
                .then(() => {
                    setDateRange(defaultDateRange);
                    toast.success('Van Reserved!')
                })
                .catch((err) => {
                    toast.error('Some Dates are already Taken!')
                })
                .finally(() => {
                    setIsLoading(false)
                    navigate('/trips')
                })
        }
    }
    
    return (
        van.displayName ?
        <div className='max-w-screen-lg mx-auto'>
        <div className="flex flex-col gap-6">
            <VanHead
                name={van.name}
                imageUrl={van.imageUrl}
                favorite={favorite}
                van={van}
            />
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                <VanInfo 
                    user={van.displayName}
                    type={van.type}
                    description={van.description}
                    capacityCount={van.capacityCount}
                    bathroomCount={van.bathroomCount}
                    bedroomCount={van.bedCount}
                    locationValue={van.locationValue}
                />
                <div className='order-first mb-10 md:order-last md:col-span-3'>
                    <VanReservation
                        price={van.price}
                        totalPrice={totalPrice}
                        onChangeDate={(value) => setDateRange(value)}
                        dateRange={dateRange}
                        onSubmit={onCreateReservation}
                        disabledDates={disabledDates}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
        </div>
        :             
        <div className="h-[60vh] flex justify-center items-center">
            <Heading 
                title="Something went wrong!"
                subtitle="No Van found!"
                center
            />
        </div>
    )
}

export default VanDetail