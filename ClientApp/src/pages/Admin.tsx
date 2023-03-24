import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Admin = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const [message, setMessage] = useState('Loading...')

  const getStuff = async () => {
    try {
      const response = await axiosPrivate.get('/api/test')
      setMessage(response.data.message)
    } catch (err) {
      console.error(err)
      // navigate('/login', { state: { from: location }, replace: true })
    }
  }

  return (
    <div>
      <p>Hey, you past the login. Welcome Here</p>
      <button onClick={() => getStuff()} className='rounded px-4 py-2 bg-red-500 mt-8'>
        Click me
      </button>
    </div>
  )
}
export default Admin
