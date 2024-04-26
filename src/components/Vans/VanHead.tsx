import React from 'react'
import { Favorite, Van } from '../../utils/firebase';
import FavoritesButton from '../Favorites/FavoritesButton';
import useCountries from '../../hooks/useCountries';
import Heading from '../Heading';


type VanHeadProps = {
    name: string;
    imageUrl: string;
    favorite: Favorite;
    van: Van;
}

const VanHead: React.FC<VanHeadProps> = ({
    name,
    imageUrl,
    favorite,
    van,
}) => {
  const { getByValue } = useCountries()

  const location = getByValue(van.locationValue)
  const favoriteArr = []

  favoriteArr.push(favorite)
  return (
    <>
      <Heading 
        title={name}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full flex justify-center'>
        <div className='overflow-hidden rounded-xl relative flex justify-center'>
          <img src={imageUrl} alt={name} loading='lazy' />
          <div className='absolute top-5 right-5'>
            <FavoritesButton favorites={favoriteArr} van={van} />
          </div>
        </div>
      </div>
    </>
  )
}

export default VanHead