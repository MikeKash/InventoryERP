import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { IItem } from '../types'

const useGetItem = (itemId: string | undefined) => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery(
    ['item', itemId],
    async () => {
      const { data } = await axiosPrivate.get<IItem>(`/api/items/${itemId}`)

      return data
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!itemId,
    },
  )
}

export default useGetItem
