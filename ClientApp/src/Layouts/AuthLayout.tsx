import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <h1 className='text-center text-xl font-semibold mb-2 absolute left-0'>Inventory ERP</h1>
      <div className='h-screen flex flex-col items-center justify-center'>
        <Outlet />
      </div>
    </>
  )
}

export default AuthLayout
