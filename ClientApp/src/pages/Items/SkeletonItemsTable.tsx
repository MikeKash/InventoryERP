import { Table } from 'flowbite-react'
import React from 'react'

const SkeletonItemsTable = ({ pageSize }: { pageSize: number }) => {
  const rows = Array.from({ length: pageSize }, (_, index) => index)
  const cols = Array.from({ length: 5 }, (_, index) => index)

  return (
    <>
      {rows.map((_, idx) => (
        <Table.Row key={`skeleton-item-row-${idx}`}>
          {cols.map((_, colIdx) => (
            <Table.Cell key={`skeleton-item-col-${colIdx}`}>
              <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse'></div>
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </>
  )
}

export default SkeletonItemsTable
