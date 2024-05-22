import React from 'react'
import SkeletonElement from '../SkeletonElement'
import SkeletonHostVanInfo from './SkeletonHostVanInfo'
import { useLocation, useParams } from 'react-router-dom'

const SkeletonHostVanPreview = () => {
    const location = useLocation()
    const { id } = useParams()
    const { pathname } = location
    
  return (
    <div className="bg-white p-6 my-8">
        <div className="flex items-center">
            <div className='w-[140px]'>
                <SkeletonElement type='image' />
            </div>
            <div className='w-1/2 ml-5'>
                <SkeletonElement type='thumbnail' />
                <SkeletonElement type='title' />
                <SkeletonElement type='title' />
            </div>
        </div>
        <div className='flex gap-4 py-3'>
            <SkeletonElement type='thumbnail' />
            <SkeletonElement type='thumbnail' />
            <SkeletonElement type='thumbnail' />
        </div>
        { pathname === `/host/vans/${id}` && <SkeletonHostVanInfo />}
        { pathname === `/host/vans/${id}/pricing` && <SkeletonElement type='title' />}
        { pathname === `/host/vans/${id}/photos` && <div className='h-20 w-20'><SkeletonElement type='image' /></div>}
    </div>
  )
}

export default SkeletonHostVanPreview