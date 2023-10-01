import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../../../api/axios'
import { AxiosError } from 'axios'
import { IPurchaseOrder } from '../types'

const useDeletePurchaseOrder = () => {
  const queryClient = useQueryClient()

  return useMutation((itemId: IPurchaseOrder['itemID']) => axios.delete(`/api/items/${itemId}`), {
    onSuccess: () => {
      alert('Item Deleted successfully')
      queryClient.refetchQueries(['items'])
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

export default useDeletePurchaseOrder
