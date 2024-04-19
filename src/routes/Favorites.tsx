import { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'

import FavoritesPreview from '../components/Favorites/FavoritesPreview'

import { Favorite, getFavorites } from '../utils/firebase'


export const loader = () => {
  return defer({ favorites: getFavorites() })
}

const Favorites = () => {
  const { favorites } = useLoaderData() as { favorites: Favorite[] }

  return (
    <div className="px-6">
      <h2>Favorites</h2>
      <Suspense fallback={<h3>Loading favorites...</h3>}>
        <Await resolve={favorites}>
          <FavoritesPreview />
        </Await>
      </Suspense>
    </div>
  )
}

export default Favorites