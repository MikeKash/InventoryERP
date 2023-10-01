import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { IPurchaseOrder } from '../types'

const useGetPurchaseOrder = (itemId: string | undefined) => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery(
    ['item', itemId],
    async () => {
      const { data } = await axiosPrivate.get<IPurchaseOrder>(`/api/items/${itemId}`)

      return data
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!itemId,
    },
  )
}

export default useGetPurchaseOrder
