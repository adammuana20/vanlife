import { useAsyncValue } from 'react-router-dom'

import VanCard from '../Vans/VanCard'
import NoState from '../NoState'

import { Favorite } from '../../utils/firebase'

const FavoritesPreview = () => {
    const favorites = useAsyncValue() as Favorite[]

  return (
    favorites.length ? (
    <>
      <h2>Favorites</h2>
      <div 
        className="
          grid
          grid-cols-1 
          sm:grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5 
          justify-items-center 
          mt-14 
          gap-8"
        >
          { favorites.map((van) => 
              (<VanCard van={van} favorites={favorites} key={van.id}  searchParams={new URLSearchParams} typeFilter={'My Favorites'} />
          ))}
      </div>
    </>
    ) : (
        <NoState 
            title="No favorites found"
            subtitle="Looks like you have no favorite van."
        />
    )
  )
}

export default FavoritesPreview