import { useAsyncValue } from 'react-router-dom'
import { useState } from 'react'

import HostVanCard from './HostVanCard'
import NoState from '../NoState'

import { Van } from '../../utils/firebase'
import Button from '../Button'

const HostVansPreview = () => {
    const vans = useAsyncValue() as Van[]
    const [limit, setLimit] = useState<number>(4)

    const loadMore = () => {
        setLimit((prev: number) => prev + 2)
    }

  return (
    vans.length ? (
        <>
            <h2 className='text-center md:text-start'>Your listed vans</h2>
            { vans
                .filter((_, idx) => idx < limit)
                .map((van) => <HostVanCard van={van} key={van.id} />)
            }
            { vans.length <= limit
                ? null
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
    ) : (
        <NoState 
            title="No van listed"
            subtitle="Looks like you haven't hosted any van."
        />
    )
  )
}

export default HostVansPreview