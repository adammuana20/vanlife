import { lazy, Suspense } from "react"
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom"

import Loading from "./components/Loading"

import { useUser } from "./contexts/User.context"

import { loader as dashboardLoader } from "./loaders/dashboardLoader"
import { action as logoutAction } from "./components/Authentication/Logout"

import { requireAuth } from "./utils/authentication"

const Home = lazy(() => import("./routes/Home"))
const About = lazy(() => import("./components/About"))
const HostLayout = lazy(() => import("./routes/HostLayout"))
const HostVanInfo = lazy(() => import("./components/Host/HostVanInfo"))
const HostVanPricing = lazy(() => import("./components/Host/HostVanPricing"))
const HostVanPhotos = lazy(() => import("./components/Host/HostVanPhotos"))
const Layout = lazy(() => import("./routes/Navbar/Layout"))
const VanPreview = lazy(() => import("./components/Vans/VanPreview"))
const Dashboard = lazy(() => import("./components/Host/Dashboard/Dashboard"))
const Income = lazy(() => import("./components/Host/Income/Income"))
const HostVanPreview = lazy(() => import("./components/Host/HostVanPreview"))
const Login = lazy(() => import("./components/Authentication/Login"))
const SignUp = lazy(() => import("./components/Authentication/SignUp"))
const Logout = lazy(() => import("./components/Authentication/Logout"))
const Vans = lazy(() => import("./routes/Vans"))
const HostVans = lazy(() => import("./routes/HostVans"))
const Trips = lazy(() => import("./routes/Trips"))
const Favorites = lazy(() => import("./routes/Favorites"))

const NotFound = lazy(() => import("./components/404"))
const Error = lazy(() => import("./components/Error"))


const App = () => {
  const { currentUser } = useUser() 

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      {/* Need Layout Design */}
      {/* <Route path="about" element={<About />}  /> */}
      <Route
        path="login"
        element={<Login />}
        lazy={async () => {
          const { loader: loginLoader, action: loginAction } = await import("./loaders/loginLoader");            
          return { 
            loader: loginLoader(currentUser),
            action: loginAction,
          };
        }}
      />
      <Route
        path="sign-up"
        element={<SignUp />}
        lazy={async () => {
          const { loader: signupLoader, action: signupAction } = await import("./loaders/signupLoader");            
          return { 
            loader: signupLoader(currentUser),
            action: signupAction,
          };
        }}
      />
      <Route
        path="vans"
        element={<Vans />}
        errorElement={<Error />}
        lazy={async () => {
          const { loader: vansLoader, } = await import("./loaders/vansLoader");            
          return { 
            loader:  vansLoader
          };
        }}
      />
      <Route 
        path="vans/:id" 
        element={<VanPreview />} 
        errorElement={<Error />}
        lazy={async () => {
          const { loader: vanPreviewLoader, } = await import("./loaders/vanPreviewLoader");            
          return { 
            loader:  vanPreviewLoader
          };
        }}
      />
      <Route 
        path="trips" 
        element={<Trips />}
        errorElement={<Error />}
        lazy={async () => {
          const { loader: tripsLoader, } = await import("./loaders/tripsLoader");            
          return { 
            loader:  tripsLoader(currentUser)
          };
        }}
      />
      <Route 
        path="favorites" 
        element={<Favorites />}
        errorElement={<Error />}
        lazy={async () => {
          const { loader: favsLoader, } = await import("./loaders/favsLoader");            
          return { 
            loader:  favsLoader(currentUser)
          };
        }}
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
          lazy={async () => {
            const { loader: incomeLoader, } = await import("./loaders/incomeLoader");            
            return { 
              loader:  incomeLoader(currentUser)
            };
          }}
        />
        <Route
          path="vans"
          element={<HostVans />}
          errorElement={<Error />}
          lazy={async () => {
            const { loader: hostVansLoader, } = await import("./loaders/hostVansLoader");            
            return { 
              loader:  hostVansLoader(currentUser)
            };
          }}
        />
        <Route
          path="vans/:id"
          element={<HostVanPreview />}
          errorElement={<Error />}
          lazy={async () => {
            const { loader: hostVanDetailLoader, } = await import("./loaders/hostVanDetailLoader");            
            return { 
              loader:  hostVanDetailLoader(currentUser)
            };
          }}
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
      <Route
        path="logout"
        element={<Logout />} 
        action={logoutAction}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  ))

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App