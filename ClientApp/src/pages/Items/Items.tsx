import { Table as FlowbiteTable } from 'flowbite-react'
import { Button, Card, Checkbox, TextInput } from 'flowbite-react/lib/esm/components'
import { Fragment, useEffect, useMemo, useState } from 'react'
import useGetItems from './hooks/useGetItems'
import SkeletonItemsTable from './SkeletonItemsTable'
import {
  useReactTable,
  PaginationState,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table'
import ItemModal from './ItemModal'
import useDebounce from '../../hooks/useDebounce'
import { IItem } from './types'
import useDeleteItem from './hooks/useDeleteItem'
import useUpdateItem from './hooks/useUpdateItem'
import { useNavigate } from 'react-router-dom'

const Items = () => {
  const navigate = useNavigate()

  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [search, setSearch] = useState('')
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>()
  const debouncedSearch: string = useDebounce<string>(search, 500)
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const pageNumber = pageIndex + 1
  const sortBy = sorting?.length ? sorting[0].id : ''
  const desc = sorting?.length
    ? sorting[0].desc !== undefined
      ? sorting[0].desc
      : true
    : undefined

  const {
    data: itemsData,
    isLoading,
    isFetching,
    refetch,
  } = useGetItems({
    search: debouncedSearch,
    pageNumber: `${pageNumber}`,
    limit: `${pageSize}`,
    sortBy,
    desc,
  })

  const { mutate } = useDeleteItem()

  const { data, totalPages, totalRecords } = useMemo(() => {
    return {
      data: itemsData?.items || [],
      totalPages: itemsData?.totalPages,
      totalRecords: itemsData?.totalRecords,
    }
  }, [itemsData])

  useEffect(() => {
    setPagination({
      pageSize,
      pageIndex: 0,
    })
    refetch()
  }, [debouncedSearch, pageSize, refetch])

  const onEdit = (itemId: string) => {
    setSelectedItemId(itemId)
    setShowAddItemModal(true)
  }

  const onDelete = (itemId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      mutate(itemId)
    }
  }

  const selectedItem = (itemsData?.items as IItem[])?.find((item) => item.itemID === selectedItemId)

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  )

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
    [],
  )

  const table = useReactTable({
    columns,
    data: data || [],
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

  const resultsCount = table.getRowModel().rows.length

  return (
    <div className='m-4'>
      <Card>
        <h1 className='font-bold text-xl'>All Items</h1>
        <div className='flex items-center justify-between'>
          <TextInput
            className='w-1/2'
            type='text'
            sizing='md'
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by Item Number or Description'
          />
          <Button onClick={() => setShowAddItemModal(true)}>Add Item +</Button>
        </div>

        <FlowbiteTable className={resultsCount ? '' : 'min-h-[600px]'} hoverable={true}>
          <FlowbiteTable.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <FlowbiteTable.HeadCell key={header.id} className='text-center'>
                    <span
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </span>
                  </FlowbiteTable.HeadCell>
                ))}
              </Fragment>
            ))}
          </FlowbiteTable.Head>
          <FlowbiteTable.Body className='divide-y'>
            {isLoading || isFetching ? (
              <SkeletonItemsTable pageSize={pageSize} />
            ) : resultsCount ? (
              <>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <FlowbiteTable.Row
                      key={row.id}
                      className='bg-white dark:border-gray-700 dark:bg-gray-800 text-center'
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <FlowbiteTable.Cell
                            key={cell.id}
                            className={
                              cell.column.columnDef.header === 'Description' ? 'text-left' : ''
                            }
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </FlowbiteTable.Cell>
                        )
                      })}
                    </FlowbiteTable.Row>
                  )
                })}
                <FlowbiteTable.Row>
                  <FlowbiteTable.Cell colSpan={10000}>
                    Showing page {pageIndex + 1} of ~{totalRecords} results
                  </FlowbiteTable.Cell>
                </FlowbiteTable.Row>
              </>
            ) : (
              <FlowbiteTable.Row>
                <FlowbiteTable.Cell className='text-center' colSpan={10000}>
                  Nothing to show
                </FlowbiteTable.Cell>
              </FlowbiteTable.Row>
            )}
          </FlowbiteTable.Body>
        </FlowbiteTable>
        {/* 
        Pagination
      */}

        <div className='flex items-center gap-2'>
          <div className='flex items-center'>
            <button
              className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
          </div>

          {isLoading ? (
            <div className='h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-full animate-pulse max-w-lg'></div>
          ) : (
            <>
              <div>
                <span>
                  Page{' '}
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                  </strong>{' '}
                </span>
                <span>
                  | Go to page:{' '}
                  <input
                    className='h-[38px] px-3 py-2 w-[100px] text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-gray-300 focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300'
                    type='number'
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0
                      table.setPageIndex(page)
                    }}
                  />
                </span>{' '}
              </div>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300'
                value={pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </Card>
      <ItemModal
        selectedItem={selectedItem}
        showModal={showAddItemModal}
        onClose={() => {
          setSelectedItemId(undefined)
          setShowAddItemModal(false)
        }}
        debouncedSearch={debouncedSearch}
        pageNumber={pageIndex + 1}
        pageSize={pageSize}
        sortBy={sortBy}
        desc={desc}
      />
    </div>
  )
}

export default Items
