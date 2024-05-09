import { useAsyncValue } from "react-router-dom"
import { Bar } from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
  } from 'chart.js'
  import { format, isAfter, isSameMonth, subDays } from "date-fns"
  import { useState, useEffect } from "react"
  
import { Van } from "../../../utils/firebase"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

const BarGraph = () => {
    const vans = useAsyncValue() as Van[]

    const cutoffDate = subDays(new Date(), 30)
    

    const recentReservations = vans.flatMap(van =>
        van.reservations.filter(reservation => isAfter(reservation.startDate.toDate(), cutoffDate))
      );

    const totalPrice = recentReservations.reduce((accumulator, reservation) => accumulator + reservation.totalPrice, 0);

    const [monthlyIncome, setMonthlyIncome] = useState<number[]>([]);

    useEffect(() => {
      const monthsOfYear = [];
      for (let i = 0; i < 12; i++) {
          const month = new Date(new Date().getFullYear(), i, 1);
          monthsOfYear.push(month);
      }

      const monthlyIncomeData = monthsOfYear.map(month => {
          const incomeForMonth = vans.reduce((total, van) => {
              return total + van.reservations.reduce((subtotal, reservation) => {
                  const reservationDate = reservation.startDate.toDate();
                  if (isSameMonth(reservationDate, month)) {
                      return subtotal + reservation.totalPrice;
                  }
                  return subtotal;
              }, 0);
          }, 0);

          return incomeForMonth;
      });

      setMonthlyIncome(monthlyIncomeData);
  }, [vans]);

  const monthLabels = monthlyIncome.map((_, index) => {
      const month = new Date(new Date().getFullYear(), index, 1);
      return format(month, 'MMMM yyyy');
  });

  
    
    const data = {
      labels: monthLabels,
      datasets: [
        {
          label: 'Monthly Income',
          data: monthlyIncome,
          backgroundColor: ["#ff8c38"],
          hoverOffset: 4,
          borderWidth: 1,
          borderColor: ['#2b2a2a']
        }
      ]
    }
    const options: ChartOptions<'bar'> = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
              label: function(context: any) {
                  let label = context.dataset.label || '';
                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label += '$' + context.parsed.y.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // Add dollar sign and format the value
                  }
                  return label;
              }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'black',
            font: {
              size: 14
            }
          }
        },
        y: {
          ticks: {
            callback: function(tickValue: string | number) {
              // Explicitly cast tickValue to a number
              const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
              return '$' + value; // Add a dollar sign to each tick value
            },
            color: 'black',
            font: {
              size: 14
            }
          }
        }
      },

    }

  return (
    <>
      <h2>My Income</h2>
      <p className="text-dark-gray">
      Last <span className="underline font-bold">30 days</span>
      </p>
      <h3 className="text-semi-black font-black">${totalPrice}</h3>
      <div className="h-[40vh]">
        <Bar data={data} options={options} />
      </div>
    </>
  )
}

export default BarGraph