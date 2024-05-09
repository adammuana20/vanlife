import { useAsyncValue } from 'react-router-dom'

import HostVanCard from './HostVanCard'
import NoVan from '../NoVan'

import { Van } from '../../utils/firebase'

const HostVansPreview = () => {
    const vans = useAsyncValue() as Van[]
  return (
    vans.length ? (
        <>
            <h2>Your listed vans</h2>
            {vans.map((van) => <HostVanCard van={van} key={van.id} />)}
        </>
    ) : (
        <NoVan 
            title="No van listed"
            subtitle="Looks like you haven't hosted any van."
        />
    )
  )
}

export default HostVansPreview