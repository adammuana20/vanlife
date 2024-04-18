import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom"

import Home from "./components/Home"
import About from "./components/About"
import VanPreview, { loader as vanPreviewLoader } from "./components/Vans/VanPreview"
import Dashboard, { loader as dashboardLoader } from "./components/Host/Dashboard"
import Income from "./components/Host/Income"
import Reviews from "./components/Host/Reviews"
import HostVanPreview, { loader as hostVanDetailLoader } from "./components/Host/HostVanPreview"
import HostVanInfo from "./components/Host/HostVanInfo"
import HostVanPricing from "./components/Host/HostVanPricing"
import HostVanPhotos from "./components/Host/HostVanPhotos"
import NotFound from "./components/404"
import Login, { loader as loginLoader, action as loginAction } from "./components/Authentication/Login"
import SignUp, { action as signupAction, loader as signupLoader } from "./components/Authentication/SignUp"
import Error from "./components/Error"
import { action as logoutAction } from "./components/Authentication/Logout"
import Logout from "./components/Authentication/Logout"

import Vans, { loader as vansLoader } from "./routes/Vans"
import HostVans, { loader as hostVansLoader} from "./routes/HostVans"
import Layout from "./routes/Layout"
import HostLayout from "./routes/HostLayout"
import Trips, { loader as tripsLoader } from "./routes/Trips"
import Favorites from "./routes/Favorites"

import { useUser } from "./contexts/User.context"

import { requireAuth } from "./utils/loaders"
import { useEffect } from "react"
import { useFavorites } from "./contexts/Favorites.context"
import { getFavorites } from "./utils/firebase"

const App = () => {
  const { currentUser } = useUser()
  const { setMyFavorites } = useFavorites()

  useEffect(() => {
    if(currentUser) {
      const fetchFavs = async() => {
        const favsArr = await getFavorites()

        setMyFavorites(favsArr)
      }
      fetchFavs()
    }
  }, [currentUser])

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader(currentUser)}
        action={loginAction}
      />
      <Route
        path="sign-up"
        element={<SignUp />}
        loader={signupLoader(currentUser)}
        action={signupAction}
      />
      <Route
        path="vans"
        element={<Vans />}
        errorElement={<Error />}
        loader={vansLoader}
      />
      <Route 
        path="vans/:id" 
        element={<VanPreview />} 
        errorElement={<Error />}
        loader={vanPreviewLoader}
      />
      <Route 
        path="trips" 
        element={<Trips />}
        errorElement={<Error />}
        loader={tripsLoader}
      />
      <Route 
        path="favorites" 
        element={<Favorites />}
        errorElement={<Error />}
        // loader={tripsLoader}
      />
      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={dashboardLoader(currentUser)}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }: { request: Request }) => await requireAuth(request, currentUser)}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }: { request: Request }) => await requireAuth(request, currentUser)}
        />
        <Route
          path="vans"
          element={<HostVans />}
          errorElement={<Error />}
          loader={hostVansLoader(currentUser)}
        />
        <Route
          path="vans/:id"
          element={<HostVanPreview />}
          errorElement={<Error />}
          loader={hostVanDetailLoader(currentUser)}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }: { request: Request }) => await requireAuth(request, currentUser)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }: { request: Request }) => await requireAuth(request, currentUser)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }: { request: Request }) => await requireAuth(request, currentUser)}
          />
        </Route>
      </Route>
      <Route path="logout" action={logoutAction} element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App