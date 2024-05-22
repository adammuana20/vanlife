import React from 'react'
import { CiImageOn } from "react-icons/ci";
import { BsFileBarGraph } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";

type SkeletonElement = {
    type: string;
}

const SkeletonElement: React.FC<SkeletonElement> = ({ type }) => {
    const classes = `
            bg-[#ddd]
            my-2.5
            animate-pulse
            ${type === 'h1' && 'w-1/4 h-12 mb-3.5 rounded'}
            ${type === 'text' && 'w-full h-4 rounded' }
            ${type === 'title' && 'w-1/2 h-6 mb-3.5 rounded'}
            ${type === 'avatar' && 'w-[100px] h-[100px] rounded-[50%] rounded'}
            ${type === 'thumbnail' && 'w-[90px] h-[35px] rounded' }
            ${type === 'image' && 'aspect-square w-full relative rounded-xl flex items-center justify-center'}
            ${type === 'button' && 'w-full h-12 rounded'}
            ${type === 'graph' && 'h-full w-full rounded flex items-center justify-center'}
            ${type === 'map' && 'h-full w-full rounded flex items-center justify-center'}
            ${type === 'calendar' && 'h-full w-full rounded flex items-center justify-center'}
        `

  return (
    <div className={classes}>
        {type === 'image' && <CiImageOn size={60} className='text-neutral-400' />}
        {type === 'graph' && <BsFileBarGraph size={60} className='text-neutral-400' />}
        {type === 'map' && <FiMapPin size={60} className='text-neutral-400' />}
        {type === 'calendar' && <FaRegCalendarAlt size={60} className='text-neutral-400' />}
    </div>
  )
}

export default SkeletonElement