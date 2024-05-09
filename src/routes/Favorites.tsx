import { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'

import FavoritesPreview from '../components/Favorites/FavoritesPreview'
import Loading from '../components/Loading'

import { Favorite, getFavorites } from '../utils/firebase'
import { User } from 'firebase/auth'
import { requireAuth } from '../utils/loaders'


export const loader = (currentUser: User | null) => async ({ request }: { request: Request }) => {
  await requireAuth(request, currentUser)
  return defer({ favorites: getFavorites() })
}

const Favorites = () => {
  const { favorites } = useLoaderData() as { favorites: Favorite[] }

  return (
    <div className="px-6">
      <Suspense fallback={<Loading />}>
        <Await resolve={favorites}>
          <FavoritesPreview />
        </Await>
      </Suspense>
    </div>
  )
}

export default Favorites