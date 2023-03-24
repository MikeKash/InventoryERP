import React from 'react'
import { TopBarMenus } from '../types'

const notifications = [
  {
    message: "Hey, what's up? All set htmlFor the presentation?",
    time: 'a few moments ago',
    onClickACtion: undefined,
  },
  {
    message: 'I just bought a new awesome theme for my dashboard',
    time: '2 hours ago',
    onClickACtion: undefined,
  },
  {
    message: 'Check out these awesome shots I got on my camera yesterday',
    time: 'yesterday',
    onClickACtion: undefined,
  },
  {
    message: 'Good news! We have just launched a new product',
    time: '2 days ago',
    onClickACtion: undefined,
  },
]

const Notifications = ({
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
        data-dropdown-toggle='notification-dropdown'
        className='p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
        onClick={() => setOpenMenu(openMenu === 'notification' ? '' : 'notification')}
      >
        <span className='sr-only'>View notifications</span>
        {/* <!-- Bell icon --> */}
        <svg
          aria-hidden='true'
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z'></path>
        </svg>
      </button>
      {openMenu === 'notification' ? (
        <div className='absolute top-10 right-16 overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700'>
          <div className='block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            Notifications
          </div>
          <div>
            {notifications.map((notification) => (
              <div className='flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600'>
                <div className='pl-3 w-full'>
                  <div className='text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400'>
                    {notification.message}
                  </div>
                  <div className='text-xs font-medium text-blue-700 dark:text-primary-400'>
                    {notification.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Notifications
