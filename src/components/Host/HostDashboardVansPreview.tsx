import { Link, useAsyncValue } from "react-router-dom"
import { useState } from "react"

import HostVanCard from "./HostVanCard"
import Heading from "../Heading"
import Button from "../Button"

import { Van } from '../../utils/firebase'


const HostDashboardVansPreview = () => {
    const vans = useAsyncValue() as Van[]
    const [limit, setLimit] = useState(3)

    const loadMore = () => {
        setLimit((prev: number) => prev + 2)
    }
    
    return (
        vans.length ? (
            <>
                <div className="flex justify-between items-center">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                { vans
                    .filter((_, idx) => idx < limit)
                    .map((van) => <HostVanCard van={van} key={van.id} />)
                }
                { vans.length <= limit
                    ? null
                    : (
                        <div className='flex justify-center items-center'>
                            <div className='w-1/6'>
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
            <div className="mt-20">
                <Heading 
                    title="No van listed"
                    subtitle="Looks like you haven't hosted any van."
                    center
                />
            </div>
        )
    )
}

export default HostDashboardVansPreview