import { useAsyncValue } from 'react-router-dom'

import VanCard from '../Vans/VanCard'
import NoVan from '../NoVan'

import { Favorite } from '../../utils/firebase'

const FavoritesPreview = () => {
    const favorites = useAsyncValue() as Favorite[]

  return (
    favorites.length ? (
    <>
      <h2>Favorites</h2>
      <div className="grid grid-cols-4 justify-items-center mt-14 gap-8">
          { favorites.map((van) => 
              (<VanCard van={van} favorites={favorites} key={van.id}  searchParams={new URLSearchParams} typeFilter={'My Favorites'} />
          ))}
      </div>
    </>
    ) : (
        <NoVan 
            title="No favorites found"
            subtitle="Looks like you have no favorite van."
        />
    )
  )
}

export default FavoritesPreview