import React from 'react'

type HomeHeadingProps = {
  title: string;
  subtitle: string;
  center?: boolean
}

const HomeHeading: React.FC<HomeHeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={` ${center ? 'text-center' : 'text-center md:text-start'} `}>
      <div className='font-bold text-primary-color pb-5 text-xl'>{title}</div>
      <div className='text-[2.5rem] tracking-wide font-extrabold leading-snug'>{subtitle}</div>
    </div>
  )
}

export default HomeHeading