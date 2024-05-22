import React from 'react'
import SkeletonElement from './SkeletonElement'

const SkeletonVans = () => {
  return (
    <div className='mt-[1.2rem]'>
        <SkeletonElement type='title' />
        <div className="flex flex-wrap justify-center gap-5">
            <SkeletonElement type='thumbnail' />
            <SkeletonElement type='thumbnail' />
            <SkeletonElement type='thumbnail' />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center mt-10 gap-8'>
            {[1,2,3,4,5].map((n) => 
                <div className='w-full' key={n}>
                    <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                        <SkeletonElement type='image' />
                    </div>
                    <SkeletonElement type='title' />
                    <SkeletonElement type='text' />
                    <SkeletonElement type='thumbnail' />
                </div>
            )}
        </div>
    </div>
  )
}

export default SkeletonVans