import { Button, Card } from 'flowbite-react'
import useUpdateItem from './hooks/useUpdateItem'
import ItemForm from './ItemForm'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useAddItem from './hooks/useAddItem'
import { itemFormFields } from './utils/itemForm'
import useGetItem from './hooks/useGetItem'
import { IItem } from './types'
import { useParams } from 'react-router-dom'
const Item = () => {
  const { id } = useParams()
  const { data: itemDetails } = useGetItem(id)
  const { mutateAsync: updateItem, isLoading: updatingItem } = useUpdateItem({})

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (itemDetails) {
      setValue('itemNumber', itemDetails.itemNumber)
      setValue('itemDescription', itemDetails.itemDescription)
      setValue('itemUM', itemDetails.itemUM)
      setValue('maxInventory', itemDetails.maxInventory)
      setValue('minInventory', itemDetails.minInventory)
    }

    return () => {
      reset()
    }
  }, [itemDetails, reset, setValue])

  const { mutateAsync: addItem, isLoading } = useAddItem()

  const handleAddOrEditItem: SubmitHandler<FieldValues> = async (formFields) => {
    const data = formFields

    if (itemDetails) {
      updateItem({ ...data, itemID: itemDetails.itemID } as IItem)
    } else {
      await addItem(data as IItem).then(() => {
        reset()
      })
    }
  }

  return (
    <div className='m-4'>
      <Card>
        <h1 className='font-bold text-xl'>{itemDetails ? 'Item Details ' : 'Add New Item'}</h1>
        <form className='' onSubmit={handleSubmit(handleAddOrEditItem)}>
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
                    disabled={name === 'itemNumber' && itemDetails ? true : false}
                    {...register(name, validationOptions)}
                  />
                  {errors[name] ? (
                    <p className='text-red-600'>{errMsgs?.[errors[name]?.type as string]}</p>
                  ) : null}
                </div>
              )
            })}
          </div>
          <div className='mt-4'>
            <Button type='submit'>
              {itemDetails
                ? updatingItem
                  ? 'Updating Item...'
                  : 'Update Item'
                : isLoading
                ? 'Adding Item...'
                : 'Add Item'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Item
