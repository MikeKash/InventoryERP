import {
  OnChangeFn,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Checkbox } from 'flowbite-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IItem, IItems } from '../types'

const useItemsTable = ({
  onEdit,
  onDelete,
  itemsData,
  setPagination,
  pagination,
  sorting,
  setSorting,
}: {
  onEdit: (itemId: string) => void
  onDelete: (itemId: string) => void
  itemsData: IItems | undefined
  setPagination: OnChangeFn<PaginationState>
  pagination: PaginationState
  sorting: SortingState
  setSorting: OnChangeFn<SortingState>
}) => {
  const navigate = useNavigate()
  const [rowSelection, setRowSelection] = useState({})

  const { data, totalPages, totalRecords } = useMemo(() => {
    return {
      data: itemsData?.items || [],
      totalPages: itemsData?.totalPages,
      totalRecords: itemsData?.totalRecords,
    }
  }, [itemsData?.items, itemsData?.totalPages, itemsData?.totalRecords])

  const columns = useMemo(
    () => [
      {
        id: 'select',
        // @ts-ignore  just for now
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected().toString(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        // @ts-ignore just for now
        cell: ({ row }) => (
          <div className='px-1'>
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected().toString(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: 'Item #',
        accessorKey: 'itemNumber',
      },
      {
        header: 'Description',
        accessorKey: 'itemDescription',
      },
      {
        header: 'Units of measure',
        accessorKey: 'itemUM',
      },
      {
        header: 'Max Level',
        accessorKey: 'maxInventory',
      },
      {
        header: 'Min Level',
        accessorKey: 'minInventory',
      },
      {
        header: 'Actions',
        // @ts-ignore just for now
        cell: ({ row }) => (
          <div className='flex  gap-2'>
            <span onClick={() => navigate(`/item/${row.original.itemID}`)}>Details</span>
            <span
              onClick={() => {
                onEdit(row.original.itemID)
              }}
            >
              Edit
            </span>
            <span
              onClick={() => {
                onDelete(row.original.itemID)
              }}
            >
              Delete
            </span>
          </div>
        ),
      },
    ],
    [navigate, onDelete, onEdit],
  )

  const table = useReactTable({
    columns,
    data,
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })

  return {
    table,
    totalRecords,
  }
}

export default useItemsTable
