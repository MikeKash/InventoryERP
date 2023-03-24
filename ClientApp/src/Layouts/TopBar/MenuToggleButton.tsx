import { Dispatch, SetStateAction } from 'react'
import { ISideBarState } from './typings'

const MenuToggleButton = ({
  setSidebar,
}: {
  setSidebar: Dispatch<SetStateAction<ISideBarState>>
}) => {
  return (
    <button
      className='hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'
      onClick={() =>
        setSidebar((prev) => {
          return { mode: prev.isOpen ? 'min' : 'regular', isOpen: !prev.isOpen }
        })
      }
    >
      <svg
        className='w-6 h-6'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
          clipRule='evenodd'
        ></path>
      </svg>
    </button>
  )
}

export default MenuToggleButton
