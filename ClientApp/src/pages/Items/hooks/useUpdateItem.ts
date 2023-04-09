import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../../../api/axios'
import { AxiosError } from 'axios'
import { IItem, IItems } from '../types'

const useUpdateItem = ({
  limit,
  pageNumber,
  sortBy,
  desc,
  search,
}: {
  limit?: string
  pageNumber?: string
  sortBy?: string
  search?: string
  desc?: boolean
}) => {
  const queryClient = useQueryClient()

  return useMutation((data: IItem) => axios.put(`/api/items/${data.itemID}`, data), {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['items', limit, pageNumber, sortBy, desc] })
      // Snapshot the previous value
      const previousData: IItems | undefined = queryClient.getQueryData([
        'items',
        limit,
        pageNumber,
        sortBy,
        desc,
      ])

      const newItems = previousData?.items.map((item: any) => {
        if (item._id === data.itemID) {
          return {
            ...item,
            ...data,
          }
        }
        return item
      })

      // Optimistically update to the new value
      queryClient.setQueryData(['items', '10', '1', '', undefined], {
        ...previousData,
        items: newItems,
      })

      // Return a context object with the snapshotted value
      return {
        previousData,
        newData: {
          ...previousData,
          items: newItems,
        },
      }
    },
    onSuccess: () => {
      alert('Item Updated successfully')
    },
    onError: (err, _, context) => {
      const errMessage = (err as AxiosError)?.response?.data
      if (errMessage) {
        queryClient.setQueryData(['items', limit, pageNumber, sortBy, desc], context?.previousData)
        alert(errMessage)
      } else {
        alert('Something went wrong updating item')
      }
    },
  })
}

export default useUpdateItem
