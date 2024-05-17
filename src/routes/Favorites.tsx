import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'

import FavoritesPreview from '../components/Favorites/FavoritesPreview'
import Loading from '../components/Loading'

import { Favorite } from '../utils/firebase'

const Favorites = () => {
  const { favorites } = useLoaderData() as { favorites: Favorite[] }

  return (
    <div className="px-6 max-w-screen-2xl mx-auto">
      <Suspense fallback={<Loading />}>
        <Await resolve={favorites}>
          <FavoritesPreview />
        </Await>
      </Suspense>
    </div>
  )
}

export default Favorites