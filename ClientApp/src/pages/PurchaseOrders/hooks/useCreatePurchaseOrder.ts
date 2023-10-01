import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../../../api/axios'
import { AxiosError } from 'axios'
import { IPurchaseOrder } from '../types'

const useCreatePurchaseOrder = () => {
  const queryClient = useQueryClient()

  return useMutation((data: IPurchaseOrder) => axios.post('/api/purchaseOrders', data), {
    onSuccess: () => {
      alert('New Purchase Order created successfully')
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

export default useCreatePurchaseOrder
