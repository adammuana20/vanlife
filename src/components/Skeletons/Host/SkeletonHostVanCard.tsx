import React from 'react'
import SkeletonElement from '../SkeletonElement'

type SkeletonHostVanCardProps = {
  addImg?: boolean
}

const SkeletonHostVanCard: React.FC<SkeletonHostVanCardProps> = ({ addImg }) => {
  return (
    <div className="flex items-center bg-white mb-4 py-3 px-6">
      { addImg && 
        <div className='mr-4'>
            <SkeletonElement type='image' />
        </div>
      }
      <div className='w-1/2'>
          <SkeletonElement type='title' />
          <SkeletonElement type='text' />
      </div>
    </div>
  )
}

export default SkeletonHostVanCard