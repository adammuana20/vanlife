import React from 'react'
import { useAsyncValue } from 'react-router-dom'
import { Favorite } from '../../utils/firebase'
import VanCard from '../Vans/VanCard'

const FavoritesPreview = () => {
    const favorites = useAsyncValue() as Favorite[]

  return (
    <div className="grid grid-cols-4 justify-items-center mt-14 gap-8">
        { favorites.map((van) => 
            (<VanCard van={van} favorites={favorites} key={van.id}  searchParams={new URLSearchParams} typeFilter={'My Favorites'} />
        ))}
    </div>
  )
}

export default FavoritesPreview