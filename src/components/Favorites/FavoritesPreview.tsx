import React from 'react'
import { useAsyncValue } from 'react-router-dom'
import { Favorite } from '../../utils/firebase'
import VanCard from '../Vans/VanCard'
import Heading from '../Heading'

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
      <div className="h-[60vh] flex justify-center items-center">
        <Heading 
            title="No favorites found"
            subtitle="Looks like you have no favorite van."
            center
        />
    </div>
    )
  )
}

export default FavoritesPreview