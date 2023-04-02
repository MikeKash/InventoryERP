import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import axios from '../axios'

const useLogin = () => {
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  return useMutation(
    (data: { userEmail: string; password: string }) => axios.post('/api/auth/login', data),
    {
      onSuccess: (response) => {
        const user = response?.data?.user
        setAuth({ user })
        navigate(from || '/', { replace: true })
      },
      onError: (err) => {
        const errMessage = (err as AxiosError)?.response?.data
        if (errMessage) {
          alert(errMessage)
        } else {
          alert('Something went wrong')
        }
      },
    },
  )
}

export default useLogin
