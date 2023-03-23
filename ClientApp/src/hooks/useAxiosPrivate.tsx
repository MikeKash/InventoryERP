import axios from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'
import { InternalAxiosRequestConfig } from 'axios'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth, setAuth } = useAuth()

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.headers && !config.headers['Authorization'])
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`

        return config
      },
      (error) => Promise.reject(error),
    )

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (
          error?.response?.status === 401 &&
          !['no refresh token found', 'refresh token expired', 'user not found'].includes(
            error?.response?.data,
          ) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axios(prevRequest)
        } else {
          // setAuth(undefined)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      axios.interceptors.request.eject(requestIntercept)
      axios.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axios
}

export default useAxiosPrivate