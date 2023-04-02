import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import TopBar from './TopBar/TopBar'
import { ISideBarState } from './TopBar/typings'
import { twMerge } from 'tailwind-merge'

const MainLayout = () => {
  const [sidebar, setSidebar] = useState<ISideBarState>({
    isOpen: true,
    mode: 'regular',
  })
  return (
    <>
      <TopBar setSidebar={setSidebar} />
      <div className='pt-16 relative'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main
          className={twMerge(sidebar.isOpen && sidebar.mode === 'regular' ? 'ml-64' : 'ml-[4rem]')}
        >
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default MainLayout
