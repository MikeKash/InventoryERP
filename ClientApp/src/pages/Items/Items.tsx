import { Table as FlowbiteTable } from 'flowbite-react'
import { Button, Card, TextInput } from 'flowbite-react/lib/esm/components'
import { Fragment, useCallback, useEffect, useState } from 'react'
import useGetItems from './hooks/useGetItems'
import SkeletonItemsTable from './SkeletonItemsTable'
import { PaginationState, flexRender, SortingState } from '@tanstack/react-table'
import ItemModal from './ItemModal'
import useDebounce from '../../hooks/useDebounce'
import { IItem } from './types'
import useDeleteItem from './hooks/useDeleteItem'
import useItemsTable from './hooks/useItemsTable'

const Items = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [search, setSearch] = useState('')
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>()
  const debouncedSearch: string = useDebounce<string>(search, 500)
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

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
    pageNumber: `${pageIndex + 1}`,
    limit: `${pageSize}`,
    sortBy,
    desc,
  })

  const { mutate: deleteItem } = useDeleteItem()

  const onEdit = useCallback((itemId: string) => {
    setSelectedItemId(itemId)
    setShowAddItemModal(true)
  }, [])

  const onDelete = useCallback(
    (itemId: string) => {
      if (confirm('Are you sure you want to delete this item?')) {
        deleteItem(itemId)
      }
    },
    [deleteItem],
  )

  const { table, totalRecords } = useItemsTable({
    onEdit,
    onDelete,
    itemsData,
    setPagination,
    pagination: { pageIndex, pageSize },
    sorting,
    setSorting,
  })

  useEffect(() => {
    refetch()
  }, [debouncedSearch, pageSize, refetch])

  const selectedItem = (itemsData?.items as IItem[])?.find((item) => item.itemID === selectedItemId)

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
            onChange={(e) => {
              setSearch(e.target.value)
              setPagination({
                pageSize,
                pageIndex: 0,
              })
            }}
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
