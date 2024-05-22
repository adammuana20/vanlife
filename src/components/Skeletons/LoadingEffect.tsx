import React from 'react'

const LoadingEffect = () => {
  return (
    <div className='absolute inset-0 top-0 left-0 w-full h-full animate-loading'>
        <div className='w-1/2 h-full skew-x-[-20deg] shadow-light bg-[rgba(255,255,255,0.2)]'></div>
    </div>
  )
}

export default LoadingEffect