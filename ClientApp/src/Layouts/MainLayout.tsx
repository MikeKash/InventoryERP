import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import TopBar from './TopBar/TopBar'
import { ISideBarState } from './TopBar/typings'

const MainLayout = () => {
  const [sidebar, setSidebar] = useState<ISideBarState>({
    isOpen: true,
    mode: 'regular',
  })
  console.log('sidebar', sidebar)
  return (
    <>
      <TopBar setSidebar={setSidebar} />
      <div className='pt-16 relative'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main className='ml-64'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default MainLayout
