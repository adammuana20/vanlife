import { subDays, isAfter } from 'date-fns'
import { Link, useAsyncValue } from 'react-router-dom'

import { Van } from '../../../utils/firebase'

const Welcome = () => {
    const vans = useAsyncValue() as Van[]

    const cutoffDate = subDays(new Date(), 30)

    const recentReservations = vans.flatMap(van =>
        van.reservations.filter(reservation => isAfter(reservation.startDate.toDate(), cutoffDate))
      );

    const totalPrice = recentReservations.reduce((accumulator, reservation) => accumulator + reservation.totalPrice, 0);
  return (
    <section className="bg-semi-light-orange flex justify-between items-center py-9 px-6">
        <div>
            <h1 className="text-semi-black m-0">Welcome!</h1>
            <p className="text-dark-gray">Income last <span className="font-bold underline">30 days</span></p>
            <h2 className="m-0 font-black text-semi-black">${totalPrice}</h2>
        </div>
        <Link to="income">Details</Link>
    </section>
  )
}

export default Welcome