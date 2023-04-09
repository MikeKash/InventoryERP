import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { IItems } from '../types'

const useGetItems = ({
  limit,
  pageNumber,
  sortBy,
  desc,
  search,
}: {
  limit: string
  pageNumber: string
  sortBy: string
  search: string
  desc?: boolean
}) => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery(
    ['items', limit, pageNumber, sortBy, desc],
    async () => {
      const { data } = await axiosPrivate.get<IItems>(
        `/api/items?pageSize=${limit}&pageNumber=${pageNumber}
        ${sortBy ? `&sortBy=${sortBy}` : ''}
        ${desc !== undefined ? `&desc=${desc}` : ''}
        ${search ? `&search=${search}` : ''}`,
      )

      return data
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  )
}

export default useGetItems
