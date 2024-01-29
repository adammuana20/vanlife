import { FC } from 'react';

import { Link } from 'react-router-dom'
import { Van } from '../../utils/firebase'

type HostVanCardProps = {
  van: Van;
}

const HostVanCard: FC<HostVanCardProps> = ({ van }) => {
  return (
    <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
        </div>
        <Link to={`/host/vans/${van.id}`}>View</Link>
    </div>
  )
}

export default HostVanCard