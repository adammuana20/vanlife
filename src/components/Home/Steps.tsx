import React from 'react'

type StepsProps = {
    step: string;
    title: string;
    subtitle: string;
}

const Steps: React.FC<StepsProps> = ({ step, title, subtitle }) => {
  return (
    <div className='flex gap-5 items-center flex-col sm:flex-row'>
        <div className='text-center text-white font-bold grow-0'>
            <div className='py-4 bg-primary-color rounded-[3rem]'>
                <p className='m-0 text-3xl tracking-wide w-[4.3rem]'>{step}</p>
            </div>
        </div>
        <div>
            <h2 className='mb-2'>{title}</h2>
            <p className='mt-1 leading-6'>{subtitle}</p>
        </div>
    </div>
  )
}

export default Steps