import { PropsWithChildren } from 'react'

const MenuButton = ({ onClick, children }: { onClick: () => void } & PropsWithChildren) => {
  return (
    <button
      type='button'
      className='flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default MenuButton
