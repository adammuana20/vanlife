import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Vans, { loader as vansLoader } from "./components/Vans/Vans"
import VanDetail, { loader as vanDetailLoader } from "./components/Vans/VanDetail"
import Dashboard, { loader as dashboardLoader } from "./components/Host/Dashboard"
import Income from "./components/Host/Income"
import Reviews from "./components/Host/Reviews"
import HostVans, { loader as hostVansLoader} from "./components/Host/HostVans"
import HostVanDetail, { loader as hostVanDetailLoader } from "./components/Host/HostVanDetail"
import HostVanInfo from "./components/Host/HostVanInfo"
import HostVanPricing from "./components/Host/HostVanPricing"
import HostVanPhotos from "./components/Host/HostVanPhotos"
import NotFound from "./components/404"
import Login, { loader as loginLoader, action as loginAction } from "./components/Authentication/Login"
import Layout from "./routes/Layout"
import HostLayout from "./routes/HostLayout"
import SignUp from "./components/Authentication/SignUp"
import Error from "./components/Error"
import { requireAuth } from "./utils"

const App = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="login"
            element={<Login />}
            loader={loginLoader}
            action={loginAction}
          />
          <Route
            path="sign-up"
            element={<SignUp />}
            // loader={loginLoader}
            // action={loginAction}
          />
          <Route
            path="vans"
            element={<Vans />}
            errorElement={<Error />}
            loader={vansLoader}
          />
          <Route 
            path="vans/:id" 
            element={<VanDetail />} 
            errorElement={<Error />}
            loader={vanDetailLoader}
          />
      
          <Route path="host" element={<HostLayout />}>
            <Route
              index
              element={<Dashboard />}
              loader={dashboardLoader}
            />
            <Route
              path="income"
              element={<Income />}
              loader={async ({ request }) => await requireAuth(request)}
            />
            <Route
              path="reviews"
              element={<Reviews />}
              loader={async ({ request }) => await requireAuth(request)}
            />
            <Route
              path="vans"
              element={<HostVans />}
              errorElement={<Error />}
              loader={hostVansLoader}
            />
            <Route
              path="vans/:id"
              element={<HostVanDetail />}
              errorElement={<Error />}
              loader={hostVanDetailLoader}
            >
              <Route
                index
                element={<HostVanInfo />}
                loader={async ({ request }) => await requireAuth(request)}
              />
              <Route
                path="pricing"
                element={<HostVanPricing />}
                loader={async ({ request }) => await requireAuth(request)}
              />
              <Route
                path="photos"
                element={<HostVanPhotos />}
                loader={async ({ request }) => await requireAuth(request)}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      ))

    return (
        <RouterProvider router={router} />
    )
}

export default App