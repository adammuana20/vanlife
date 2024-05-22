import React from 'react'
import SkeletonElement from '../SkeletonElement'

const SkeletonVanDetail = () => {
  return (
    <div className='px-8'>
        <SkeletonElement type='h1' />
        <SkeletonElement type='title' />
        <div className="flex flex-col gap-6">
            <div className='w-full flex justify-center'>
                <div className='overflow-hidden rounded-xl relative flex justify-center w-1/2'>
                    <SkeletonElement type='image' />
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>

            </div>
        </div>
        <div className='flex gap-8'>
            <div className=" w-1/2 col-span-4 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <SkeletonElement type='h1' />
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            gap-4
                        "
                    >
                        <SkeletonElement type='text' />
                        <SkeletonElement type='text' />
                        <SkeletonElement type='text' />
                    </div>
                        <SkeletonElement type='thumbnail' />
                </div>
                <hr/>
                <SkeletonElement type='text' />
                <hr/>
                <div className='h-[20rem]'>
                    <SkeletonElement type='map' />
                </div>
            </div>
            <div className='w-1/2 h-[25rem]'>
                <SkeletonElement type='calendar' />
            </div>
        </div>
    </div>
  )
}

export default SkeletonVanDetail