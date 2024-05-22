import React from 'react'
import SkeletonElement from '../SkeletonElement'
import SkeletonHostVanCard from './SkeletonHostVanCard'

const SkeletonHostVans = () => {
  return (
    <div className='flex flex-col gap-1'>
        <SkeletonElement type='title' />
        {[1,2,3].map((n) => <SkeletonHostVanCard key={n} addImg/>)}
    </div>
  )
}

export default SkeletonHostVans