import React, { useState } from 'react'
import { TopBarMenus } from '../types'
import UserMenu from './UserMenu'

const UserAvatar = ({
  setOpenMenu,
  openMenu,
}: {
  setOpenMenu: (menu: TopBarMenus) => void
  openMenu: TopBarMenus
}) => {
  return (
    <>
      <button
        type='button'
        className='flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
        onClick={() => setOpenMenu(openMenu === 'userAvatar' ? '' : 'userAvatar')}
      >
        <span className='sr-only'>Open user menu</span>
        <img
          className='w-8 h-8 rounded-full'
          src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
          alt='user photo'
        />
      </button>
      {openMenu === 'userAvatar' ? <UserMenu /> : null}
    </>
  )
}

export default UserAvatar
