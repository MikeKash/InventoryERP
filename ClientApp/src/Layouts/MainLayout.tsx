import { Link, Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <nav className='mb-4'>
        <ul>
          <li>
            <Link to='/logout'>Logout</Link>
          </li>
          <li>
            <Link to='/'>HOME</Link>
          </li>
          <li>
            <Link to='/admin'>See Admins TEST</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  )
}

export default MainLayout
