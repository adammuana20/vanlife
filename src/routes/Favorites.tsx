import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'

import FavoritesPreview from '../components/Favorites/FavoritesPreview'
import SkeletonTripsFavs from '../components/Skeletons/SkeletonTripsFavs'

import { Favorite } from '../utils/firebase'

const Favorites = () => {
  const { favorites } = useLoaderData() as { favorites: Favorite[] }

  return (
    <div className="px-6 max-w-screen-2xl mx-auto">
      <Suspense fallback={<SkeletonTripsFavs />}>
        <Await resolve={favorites}>
          <FavoritesPreview />
        </Await>
      </Suspense>
    </div>
  )
}

export default Favorites