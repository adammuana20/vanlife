import React from 'react'


type VanHeadProps = {
    name: string;
    imageSrc: string;
    id: string;
}

const VanHead: React.FC<VanHeadProps> = ({
    name,
    imageSrc,
    id,
}) => {
  return (
    <img src={imageSrc} alt={name} className='object-cover w-1/2 rounded mx-auto' />
  )
}

export default VanHead