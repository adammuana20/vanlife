import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useState, useEffect, useMemo } from 'react'
import { Range } from 'react-date-range'
import { useAsyncValue, useNavigate } from 'react-router-dom'

import { useCategories } from '../../contexts/Categories.context'
import VanHead from './VanHead'
import VanReservation from './VanReservation'

import { Reservation, Van, createReservationDocumentOfUser } from '../../utils/firebase'
import { getCategoryColor } from '../../utils/helpers'
import { useUser } from '../../contexts/User.context'

const defaultDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

const VanDetail = () => {
    const data = useAsyncValue()

    const [isLoading, setIsLoading] = useState(false)
    const [van, reservations] = data as [Van, Reservation[]]    
    const navigate = useNavigate()
    
    const { currentUser } = useUser()

    const { name, description, price, imageUrl, type, id } = van

    const { categoriesColor } = useCategories()

    const [dateRange, setDateRange] = useState<Range>(defaultDateRange)
    const [totalPrice, setTotalPrice] = useState(0)
    
    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            )

            if(dayCount && price) {
                setTotalPrice(dayCount * price)
            } else {
                setTotalPrice(price)
            }
        }
    }, [dateRange, price])

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


    const onCreateReservation = async() => {
        if(!currentUser) {
            return navigate('/login')
        }
        
        if(dateRange.startDate && dateRange.endDate) {
            try {
                setIsLoading(true)
                await createReservationDocumentOfUser(dateRange.startDate, dateRange.endDate, van, totalPrice)
                setDateRange(defaultDateRange);
            } catch(err) {
                console.error('Error Creating Reservation:', err)
            } finally {
                setIsLoading(false)
            }
        }
    }
    
    return (
        <div className="flex flex-col mt-5">
            <VanHead
                name={name}
                imageSrc={imageUrl}
                id={id}
            />
            <div className='flex gap-8 mt-8'>
                <div className='col-span-4 flex flex-col'>
                    <i className={`text-sm font-medium border-none rounded transition-all duration-200 ease-in-out mr-5 py-2 px-5 text-white self-start mb-8`} style={{ backgroundColor: `${getCategoryColor(categoriesColor, type)}` }}>{type}</i>
                    <h2 className='mt-0'>{name}</h2>
                    <p className='m-0'>{description}</p>
                </div>
                <div className='order-first mb-10 md:order-last md:col-span-3'>
                    <VanReservation
                        price={price}
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
    )
}

export default VanDetail