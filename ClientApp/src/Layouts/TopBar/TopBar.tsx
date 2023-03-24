import { Dispatch, SetStateAction, useState } from 'react'
import Logo from './Logo'
import MenuToggleButton from './MenuToggleButton'
import Notifications from './Notifications/Notifications'
import TopBarMobileSearchButton from './TopBarMobileSearchButton'
import TopBarSearch from './TopBarSearch'
import { TopBarMenus } from './types'
import { ISideBarState } from './typings'
import UserAvatar from './UserAvatar/UserAvatar'

const TopBar = ({ setSidebar }: { setSidebar: Dispatch<SetStateAction<ISideBarState>> }) => {
  const [openMenu, setOpenMenu] = useState<TopBarMenus>('')
  return (
    <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 fixed w-full border-b z-50'>
      <div className='flex flex-wrap justify-between items-center'>
        <div className='flex justify-start items-center'>
          <MenuToggleButton setSidebar={setSidebar} />
          <Logo />
          <TopBarSearch />
        </div>
        <div className='flex items-center lg:order-2'>
          <TopBarMobileSearchButton />
          <Notifications setOpenMenu={setOpenMenu} openMenu={openMenu} />
          <UserAvatar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
      </div>
    </nav>
  )
}

export default TopBar
