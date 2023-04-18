import { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { IItem } from '../types'
import useAddItem from './useAddItem'
import { Button } from 'flowbite-react'
import useUpdateItem from './useUpdateItem'

interface IItemFormInputs {
  itemNumber: string
  itemDescription: string
  itemUM: string
  minInventory: number
  maxInventory: number
}

export interface IItemFormFields {
  name: keyof IItemFormInputs
  displayName: string
  defaultValue: string | number
  validationOptions: {
    required: boolean
    validate?: any
  }
  errMsgs?: {
    [key: string]: string
  }
}

const initialFormValues = {
  itemNumber: '',
  itemDescription: '',
  itemUM: 'EA',
  minInventory: 0,
  maxInventory: 0,
}

export const itemFormFields: IItemFormFields[] = [
  {
    name: 'itemNumber',
    displayName: 'Item Number',
    defaultValue: initialFormValues.itemNumber,
    validationOptions: {
      required: true,
    },
    errMsgs: {
      required: 'Item number is required',
    },
  },
  {
    name: 'itemDescription',
    displayName: 'Item Description',
    defaultValue: initialFormValues.itemDescription,
    validationOptions: {
      required: true,
    },
    errMsgs: {
      required: 'Item Description is required',
    },
  },
  {
    name: 'itemUM',
    displayName: 'Units of Measure',
    defaultValue: initialFormValues.itemUM,
    validationOptions: {
      required: true,
    },
    errMsgs: {
      required: 'Units of Measure is required',
    },
  },
  {
    name: 'minInventory',
    displayName: 'Min Inventory',
    defaultValue: initialFormValues.minInventory,
    validationOptions: {
      required: false,
    },
  },
  {
    name: 'maxInventory',
    displayName: 'Max Inventory',
    defaultValue: initialFormValues.maxInventory,
    validationOptions: {
      required: false,
    },
  },
]

const useItemForm = ({
  selectedItem,
  debouncedSearch,
  pageNumber,
  pageSize,
  sortBy,
  desc,
}: {
  selectedItem?: IItem
  debouncedSearch?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  desc?: boolean
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const { mutateAsync: addItem, isLoading } = useAddItem()
  const { mutateAsync: updateItem, isLoading: updatingItem } = useUpdateItem({
    search: debouncedSearch,
    pageNumber: `${pageNumber}`,
    limit: `${pageSize}`,
    sortBy,
    desc,
  })

  useEffect(() => {
    if (selectedItem) {
      setValue('itemNumber', selectedItem.itemNumber)
      setValue('itemDescription', selectedItem.itemDescription)
      setValue('itemUM', selectedItem.itemUM)
      setValue('maxInventory', selectedItem.maxInventory)
      setValue('minInventory', selectedItem.minInventory)
    }
  }, [selectedItem, setValue])

  const handleAddOrEditItem: SubmitHandler<FieldValues> = async (formFields) => {
    const data = formFields

    if (selectedItem && updateItem) {
      updateItem({ ...data, itemID: selectedItem.itemID } as IItem)
    } else {
      await addItem(data as IItem).then(() => {
        reset()
      })
    }
  }

  const ItemForm = () => (
    <form>
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
    </form>
  )

  const ItemFormSubmitBtn = () => (
    <Button onClick={handleSubmit(handleAddOrEditItem)}>
      {selectedItem
        ? updatingItem
          ? 'Updating Item...'
          : 'Update Item'
        : isLoading
        ? 'Adding Item...'
        : 'Add Item'}
    </Button>
  )

  return {
    ItemForm,
    ItemFormSubmitBtn,
    reset,
  }
}

export default useItemForm
