import { Link, useAsyncValue } from "react-router-dom"

import HostVanCard from "./HostVanCard"

import { Van } from '../../utils/firebase'
import Heading from "../Heading"


const HostDashboardVansPreview = () => {
    const vans = useAsyncValue() as Van[]

    return (
        vans.length ? (
            <>
                <div className="flex justify-between items-center">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                {vans.map((van) => <HostVanCard van={van} key={van.id} />)}
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