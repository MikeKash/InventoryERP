import axios from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'
import { InternalAxiosRequestConfig } from 'axios'
import { useNavigate } from 'react-router-dom'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config
      },
      (error) => Promise.reject(error),
    )

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response } = error

        const prevRequest = error?.config
        if (
          response?.status === 401 &&
          !['no refresh token found', 'refresh token expired'].includes(response?.data) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true
          await refresh()
          // prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axios(prevRequest)
        } else {
          if (response?.data === 'no refresh token found') {
            alert('Session expired, you need to log in again.')
            setAuth(undefined)
            navigate('/login')
          }
        }
        return Promise.reject(error)
      },
    )

    return () => {
      axios.interceptors.request.eject(requestIntercept)
      axios.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh, navigate, setAuth])

  return axios
}

export default useAxiosPrivate
