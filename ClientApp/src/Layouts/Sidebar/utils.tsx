export const mainMenuItems = [
  {
    label: 'Dashboard',
    icon: (
      <svg
        aria-hidden='true'
        className='w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
        <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
      </svg>
    ),
    navigate: '/',
    subMenu: [],
  },
  {
    label: 'Inventory',
    icon: (
      <svg
        aria-hidden='true'
        className='flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z'
          clipRule='evenodd'
        ></path>
      </svg>
    ),
    navigate: '',
    subMenu: [
      {
        label: 'Settings',
        navigate: '/settings',
      },
      {
        label: 'Admin Page',
        navigate: '/admin',
      },
      {
        label: 'Logout Page',
        navigate: '/logout',
      },
    ],
  },
]

export const secondMenuItems = [
  {
    label: 'Help',
    icon: (
      <svg
        aria-hidden='true'
        className='flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z'
          clipRule='evenodd'
        ></path>
      </svg>
    ),
    navigate: '/help',
    subMenu: [],
  },
]
