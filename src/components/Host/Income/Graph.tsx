import { useAsyncValue } from "react-router-dom"
import { Van } from "../../../utils/firebase"

import IncomeImg from "../../../assets/images/income-graph.png"
import { subDays, isAfter } from "date-fns"


const Graph = () => {
    const vans = useAsyncValue() as Van[]

    const cutoffDate = subDays(new Date(), 30)

    const recentReservations = vans.flatMap(van =>
        van.reservations.filter(reservation => isAfter(reservation.startDate.toDate(), cutoffDate))
      );

    const totalPrice = recentReservations.reduce((accumulator, reservation) => accumulator + reservation.totalPrice, 0);

  return (
    <>
        <p className="text-dark-gray">
        Last <span className="underline font-bold">30 days</span>
        </p>
        <h3 className="text-semi-black font-black">${totalPrice}</h3>
        <img
            className="w-full max-w-lg"
            src={IncomeImg}
            alt="Income graph"
        />
    </>
  )
}

export default Graph