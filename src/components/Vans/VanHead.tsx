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
    <img src={imageSrc} alt={name} className='object-cover w-full rounded' />
  )
}

export default VanHead