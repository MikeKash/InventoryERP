import { Button, Modal } from 'flowbite-react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useAddItem from './hooks/useAddItem'
import { IItem } from './types'
import { useEffect } from 'react'
import { itemFormFields } from './utils/itemForm'

const ItemModal = ({
  selectedItem,
  showModal,
  onClose,
  updateItem,
  updatingItem,
}: {
  selectedItem: IItem | undefined
  showModal: boolean
  onClose: () => void
  updateItem?: (item: IItem) => void
  updatingItem?: boolean
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (selectedItem) {
      setValue('itemNumber', selectedItem.itemNumber)
      setValue('itemDescription', selectedItem.itemDescription)
      setValue('itemUM', selectedItem.itemUM)
      setValue('maxInventory', selectedItem.maxInventory)
      setValue('minInventory', selectedItem.minInventory)
    }

    return () => {
      reset()
    }
  }, [selectedItem, reset, setValue])

  const { mutateAsync: addItem, isLoading } = useAddItem()

  const handleAddOrEditItem: SubmitHandler<FieldValues> = async (formFields) => {
    const data = formFields
    console.log('data', data)

    // if (selectedItem && updateItem) {
    //   updateItem({ ...data, itemID: selectedItem.itemID } as IItem)
    // } else {
    //   await addItem(data as IItem).then(() => {
    //     reset()
    //     onClose()
    //   })
    // }
  }

  const closeModal = () => {
    reset()
    onClose()
  }

  return (
    <Modal show={showModal} onClose={() => closeModal()}>
      <form className='' onSubmit={handleSubmit(handleAddOrEditItem)}>
        <Modal.Header>{selectedItem ? 'Update ' : 'Add New '}Item</Modal.Header>
        <Modal.Body>
          <div className='grid md:grid-cols-2 gap-4'>
            {itemFormFields.map((field) => {
              const { name, defaultValue, validationOptions, errMsgs, displayName } = field

              return (
                <div key={`form-field-${name}`}>
                  <label htmlFor={displayName} className='block text-sm mb-1'>
                    {`${displayName} ${validationOptions.required ? '*' : ''}`}
                  </label>
                  <input
                    key={`input-${name}`}
                    id={name}
                    className='form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    placeholder={`Please enter ${displayName.toLowerCase()}`}
                    defaultValue={defaultValue}
                    disabled={name === 'itemNumber' && selectedItem ? true : false}
                    {...register(name, validationOptions)}
                  />
                  {errors[name] ? (
                    <p className='text-red-600'>{errMsgs?.[errors[name]?.type as string]}</p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'>
            {selectedItem
              ? updatingItem
                ? 'Updating Item...'
                : 'Update Item'
              : isLoading
              ? 'Adding Item...'
              : 'Add Item'}
          </Button>
          <Button color='gray' onClick={() => closeModal()}>
            Cancel
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ItemModal
