import { Link } from 'react-router-dom'
import { useState } from 'react'
import MenuButton from './MenuButton'
import MenuLink from './MenuLink'
import { mainMenuItems, secondMenuItems } from './utils'
import { twMerge } from 'tailwind-merge'
import { ISideBarState } from '../TopBar/typings'

const Sidebar = ({
  sidebar,
  setSidebar,
}: {
  sidebar: ISideBarState
  setSidebar: (state: ISideBarState) => void
}) => {
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const handleSidebar = (isOpen: boolean) => {
    sidebar.mode === 'min' && setSidebar({ ...sidebar, isOpen })
  }

  return (
    <aside
      className={twMerge(
        'h-screen absolute top-0 left-0 pt-16 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ease-in-out duration-100 transition-all',
        sidebar.isOpen ? 'w-64 z-10' : 'w-16',
      )}
      onMouseEnter={() => handleSidebar(true)}
      onMouseLeave={() => handleSidebar(false)}
    >
      <div className='overflow-y-auto py-5 px-3 h-full bg-white '>
        <ul className='space-y-2'>
          {mainMenuItems.map((item) => (
            <li key={`menu-item-${item.label}`}>
              {!item.subMenu.length ? (
                <MenuLink
                  navigateTo={item.navigate}
                  icon={item.icon}
                  label={item.label}
                  sidebar={sidebar}
                />
              ) : (
                <>
                  <MenuButton
                    onClick={() => {
                      setOpenMenus((prev) => {
                        if (prev.includes(item.label)) {
                          return prev.filter((i) => i !== item.label)
                        }
                        return [...prev, item.label]
                      })
                    }}
                  >
                    {item.icon}
                    <span
                      className={twMerge(
                        'flex-1 ml-3 text-left whitespace-nowrap',
                        sidebar.isOpen ? '' : 'hidden',
                      )}
                    >
                      {item.label}
                    </span>
                    <svg
                      aria-hidden='true'
                      className={twMerge(sidebar.isOpen ? '' : 'hidden', 'w-6 h-6')}
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </MenuButton>

                  {openMenus.includes(item.label) && sidebar.isOpen ? (
                    <ul className='py-2 space-y-2'>
                      {item.subMenu.map((subItem, idx) => (
                        <li key={subItem.label}>
                          <Link
                            to={subItem.navigate}
                            className='flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              )}
            </li>
          ))}
        </ul>
        <ul className='pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700'>
          {secondMenuItems.map((submenu) => (
            <li key={`submenu-item-${submenu.label}`}>
              <MenuLink
                sidebar={sidebar}
                navigateTo={submenu.navigate}
                icon={submenu.icon}
                label={submenu.label}
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
