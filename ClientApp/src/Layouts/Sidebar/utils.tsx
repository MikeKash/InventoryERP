const iconStyleClasses =
  'w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'

export const mainMenuItems = [
  {
    label: 'Dashboard',
    icon: (
      <svg
        aria-hidden='true'
        className={iconStyleClasses}
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
        className={iconStyleClasses}
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 640 512'
      >
        <path d='M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z' />
      </svg>
    ),
    navigate: '',
    subMenu: [
      {
        label: 'Add Item',
        navigate: '/item/',
      },
      {
        label: 'All Items',
        navigate: '/items',
      },
    ],
  },
  // {
  //   label: 'Purchasing',
  //   icon: (
  //     <svg
  //       xmlns='http://www.w3.org/2000/svg'
  //       viewBox='0 0 512 512'
  //       className={iconStyleClasses}
  //       fill='currentColor'
  //     >
  //       <path d='M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z' />
  //     </svg>
  //   ),
  //   navigate: '',
  //   subMenu: [
  //     {
  //       label: 'Create PO',
  //       navigate: '/purchase-order/',
  //     },
  //     {
  //       label: 'Purchase Orders',
  //       navigate: '/purchase-orders',
  //     },
  //     {
  //       label: 'Suppliers',
  //       navigate: '/suppliers',
  //     },
  //   ],
  // },
  // {
  //   label: 'Sales',
  //   icon: (
  //     <svg
  //       xmlns='http://www.w3.org/2000/svg'
  //       viewBox='0 0 576 512'
  //       className={iconStyleClasses}
  //       fill='currentColor'
  //     >
  //       <path d='M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3 0 0c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z' />
  //     </svg>
  //   ),
  //   navigate: '',
  //   subMenu: [
  //     {
  //       label: 'Orders',
  //       navigate: '/sales-orders',
  //     },
  //     {
  //       label: 'Customers',
  //       navigate: '/customers',
  //     },
  //   ],
  // },
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
