import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'

const useLogout = () => {
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  return useMutation(() => axios.post('/api/auth/logout'), {
    onSuccess: (response) => {
      if (response.status === 200) {
        setAuth(undefined)
        navigate('/login')
      }
    },
    onError: (err) => {
      const errMessage = (err as AxiosError)?.response?.data
      if (errMessage) {
        alert(errMessage)
      } else {
        alert('Something went wrong')
      }
    },
  })
}

export default useLogout
