import { useParams } from 'react-router-dom'
import useGetItem from './hooks/useGetItem'
import { Button, Card, Checkbox, Spinner } from 'flowbite-react'
import { IItem } from './types'
import ItemModal from './ItemModal'
import { useState } from 'react'

const itemDetailsLabelMapper = {
  itemNumber: 'Item Number',
  itemDescription: 'Item Description',
  itemUM: 'Units of Measure',
  minInventory: 'Minimum Inventory',
  maxInventory: 'Maximum Inventory',
  stockQty: 'Stock Quantity',
  autoReorder: 'Auto Reorder',
}

const ItemDetails = () => {
  const { id } = useParams()
  const { data: itemDetails, isLoading } = useGetItem(id)

  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false)
  return (
    <>
      <div className='m-4'>
        <Card>
          {isLoading ? (
            <div>
              <Spinner aria-label='Large spinner example' size='lg' />
            </div>
          ) : (
            <div>
              <h1 className='font-bold text-xl mb-4'>Item Details</h1>
              <div className='grid md:grid-cols-2 gap-4'>
                {itemDetails &&
                  Object.keys(itemDetails).map((key) => {
                    const value = itemDetails[key as keyof IItem]
                    const label = itemDetailsLabelMapper[key as keyof typeof itemDetailsLabelMapper]

                    return key === 'itemID' ? null : (
                      <div key={`item-details-${key}`}>
                        {typeof value !== 'boolean' ? (
                          <>
                            <label htmlFor={key} className='block text-sm mb-1'>
                              {label}
                            </label>
                            <input
                              disabled
                              key={`input-${key}`}
                              id={key}
                              defaultValue={value}
                              className='form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            />
                          </>
                        ) : (
                          <>
                            <label htmlFor={key} className='block text-sm mb-1'>
                              {label}
                            </label>
                            <Checkbox
                              {...{
                                defaultChecked: value,
                                disabled: true,
                              }}
                            />
                          </>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
          <div>
            <Button onClick={() => setShowUpdateItemModal(true)}>Update Item</Button>
          </div>
        </Card>
      </div>
      <ItemModal
        selectedItem={itemDetails}
        showModal={showUpdateItemModal}
        onClose={() => {
          setShowUpdateItemModal(false)
        }}
      />
    </>
  )
}

export default ItemDetails
