import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { ISideBarState } from '../TopBar/typings'

const MenuLink = ({
  navigateTo,
  icon,
  label,
  sidebar,
}: {
  navigateTo: string
  icon: JSX.Element
  label: string
  sidebar: ISideBarState
} & PropsWithChildren) => {
  return (
    <Link
      to={navigateTo}
      className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
    >
      <>
        {icon}
        <span className={twMerge(sidebar.isOpen ? '' : 'hidden', 'ml-3')}>{label}</span>
      </>
    </Link>
  )
}

export default MenuLink
