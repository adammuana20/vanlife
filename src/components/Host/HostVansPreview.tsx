import { useAsyncValue } from "react-router-dom"

import HostVanCard from "./HostVanCard"

import { Van } from '../../utils/firebase'


const HostVansPreview = () => {
    const vans = useAsyncValue() as Van[]

    return (
        vans.map((van) => <HostVanCard van={van} key={van.id} />)
    )
}

export default HostVansPreview