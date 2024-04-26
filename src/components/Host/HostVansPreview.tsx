import { useAsyncValue } from 'react-router-dom'

import { Van } from '../../utils/firebase'
import HostVanCard from './HostVanCard'
import Heading from '../Heading'

const HostVansPreview = () => {
    const vans = useAsyncValue() as Van[]
  return (
    vans.length ? (
        <>
            <h2>Your listed vans</h2>
            {vans.map((van) => <HostVanCard van={van} key={van.id} />)}
        </>
    ) : (
        <Heading 
            title="No van listed"
            subtitle="Looks like you haven't hosted any van."
        />
    )
  )
}

export default HostVansPreview