import { useContext } from 'react'
import { Link } from 'react-router-dom'
import useLogout from '../../../api/auth/useLogout'
import AuthContext from '../../../context/AuthProvider'
import { userMenuOptions } from './utils'

const menuBtnClasses =
  'block w-full text-left py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'

const UserMenu = () => {
  const { mutateAsync: logout } = useLogout()
  const { auth } = useContext(AuthContext)
  const user = auth?.user

  return (
    <div
      className='absolute top-10 right-1 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
      id='dropdown'
    >
      <div className='py-3 px-4'>
        <span className='block text-sm font-semibold text-gray-900 dark:text-white'>
          {user?.userName}
        </span>
        <span className='block text-sm font-light text-gray-500 truncate dark:text-gray-400'>
          {user?.userEmail}
        </span>
      </div>
      <ul className='py-1 font-light text-gray-500 dark:text-gray-400' aria-labelledby='dropdown'>
        {userMenuOptions.map((option) => (
          <li key={option.label}>
            <Link to={option.navigateTo} className={menuBtnClasses}>
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className='py-1 font-light text-gray-500 dark:text-gray-400' aria-labelledby='dropdown'>
        <li>
          <button onClick={() => logout()} className={menuBtnClasses}>
            Sign out
          </button>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu
