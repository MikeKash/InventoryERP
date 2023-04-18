import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import Admin from './pages/Admin'
import MainLayout from './Layouts/MainLayout'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Missing from './pages/Missing'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'
import Unauthorized from './pages/Unauthorized'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import AuthLayout from './Layouts/AuthLayout'
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'
import Items from './pages/Items/Items'
import NewItem from './pages/Items/NewItem'
import ItemDetails from './pages/Items/ItemDetails'

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}

const AppRouter = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth) navigate('/login')
  }, [auth, navigate])

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/restore-password' element={<ResetPassword />} />
        <Route path='/register' element={<Register />} />
      </Route>
      {!auth ? (
        <Route element={<ProtectedRoute allowedRoles={[ROLES.User]} />}>
          <Route path='/' element={<></>} />
        </Route>
      ) : (
        <Route element={<ProtectedRoute allowedRoles={[ROLES.User]} />}>
          <Route path='/' element={<MainLayout />}>
            <Route path='/logout' element={<Logout />} />
            <Route path='unauthorized' element={<Unauthorized />} />
            {/* protected routes */}

            <Route path='/' element={<Home />} />
            <Route path='items' element={<Items />} />
            <Route path='item/:id' element={<ItemDetails />} />
            <Route path='item/' element={<NewItem />} />

            {/* <Route element={<ProtectedRoute allowedRoles={[ROLES.Admin]} />}>
            <Route path='admin' element={<Admin />} />
          </Route> */}

            {/* catch all */}
            <Route path='*' element={<Missing />} />
          </Route>
        </Route>
      )}
    </Routes>
  )
}

export default AppRouter
