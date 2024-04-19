import React from 'react'
import { Favorite, Van } from '../../utils/firebase';
import FavoritesButton from '../Favorites/FavoritesButton';


type VanHeadProps = {
    name: string;
    imageSrc: string;
    id: string;
    favorite: Favorite;
    van: Van;
}

const VanHead: React.FC<VanHeadProps> = ({
    name,
    imageSrc,
    id,
    favorite,
    van,
}) => {

  const favoriteArr = []

  favoriteArr.push(favorite)
  return (
    <div className='w-full flex justify-center'>
      <div className='w-1/2 overflow-hidden rounded-xl relative flex justify-center'>
        <img src={imageSrc} alt={name} loading='lazy' />
        <div className='absolute top-5 right-5'>
          <FavoritesButton favorites={favoriteArr} van={van} />
        </div>
      </div>
    </div>
  )
}

export default VanHead