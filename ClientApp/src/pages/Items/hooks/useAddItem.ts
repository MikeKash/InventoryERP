import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../../../api/axios'
import { AxiosError } from 'axios'

const useAddItem = () => {
  const queryClient = useQueryClient()

  return useMutation((data: any) => axios.post('/api/items', data), {
    onSuccess: () => {
      alert('Item added successfully')
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

export default useAddItem
