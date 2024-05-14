import { subDays, isAfter } from 'date-fns';
import { useAsyncValue } from 'react-router-dom';
import { Van } from '../../../utils/firebase';
import Heading from '../../Heading';
import Button from '../../Button';
import { useState } from 'react';

const Transactions = () => {
    const vans = useAsyncValue() as Van[]
    const [limit, setLimit] = useState(3)

    const loadMore = () => {
        setLimit((prev: number) => prev + 3)
    }

    const cutoffDate = subDays(new Date(), 30)

    const recentTransactions = vans.flatMap(van =>
        van.reservations.filter(reservation => isAfter(reservation.startDate.toDate(), cutoffDate))
      );

      recentTransactions.sort((a, b) => (b.createdAt.toDate() as any) - (a.createdAt.toDate() as any));
         
  return (
    <>
    <div className="info-header">
        <h3 className="font-bold mt-[3.75rem]">Your transactions ({recentTransactions.length})</h3>
        <p className="text-drak-gray">
            Last <span className="underline font-bold">30 days</span>
        </p>
    </div>
    {
        recentTransactions.length 
        ?( 
            <>
                {recentTransactions
                    .filter((_, idx) => idx < limit)
                    .map((transaction, idx) => {
                    const jsCreatedAt = transaction.createdAt.toDate()
                    // Options for date formatting
                    const options = { month: 'short', day: '2-digit', year: 'numeric' } as const;                
                    
                    // Format the date using options
                    const createdAt = jsCreatedAt.toLocaleDateString('en-US', options);
                        return (
                            <div key={idx} className="flex justify-between items-center bg-white mb-8 rounded-md py-5">
                                <h3 className="font-semi-bold m-0 px-5">${transaction.totalPrice}</h3>
                                <p className="text-dark-gray px-5">{createdAt}</p>
                            </div>
                        )
                    })
                }
                { recentTransactions.length <= limit ?
                    null
                    : (
                        <div className='flex justify-center items-center'>
                            <div className='md:w-1/6 w-full'>
                                <Button
                                    label='Load More'
                                    onClick={loadMore}
                                />
                            </div>
                        </div>
                    )
                }
            </>
        )
        : (
            <Heading 
                title="No transaction found"
                subtitle="Looks like no one rented on your van."
                center
            />
        )
    }
    </>
  )
}

export default Transactions