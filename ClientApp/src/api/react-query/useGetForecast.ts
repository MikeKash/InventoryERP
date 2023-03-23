import { useQuery } from '@tanstack/react-query'
import axios from '../axios'

const getForecast = async () => {
    const { data } = await axios.get('/weatherforecast')
    return data
}

const useGetForecast = () => {
    return useQuery(['forecast'], () => getForecast(), { enabled: false })
}

export default useGetForecast
