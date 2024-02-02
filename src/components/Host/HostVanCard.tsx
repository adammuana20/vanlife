import { FC } from 'react';

import { Link } from 'react-router-dom'
import { Van } from '../../utils/firebase'

type HostVanCardProps = {
  van: Van;
}

const HostVanCard: FC<HostVanCardProps> = ({ van }) => {
  const { id, imageUrl, name, price } = van

  return (
    <div className="flex items-center justify-between bg-white mb-4 py-3 px-6" key={id}>
      <div className='flex items-center'>
        <img src={imageUrl} alt={`Photo of ${name}`} className='h-[4.4rem] rounded mr-4' />
        <div className="host-van-info">
            <h3 className='font-semibold my-3'>{name}</h3>
            <p className='my-3'>${price}/day</p>
        </div>
      </div>
      <Link to={`/host/vans/${id}`}>View</Link>
    </div>
  )
}

export default HostVanCard