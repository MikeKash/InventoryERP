import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { IItem } from './types'
import { useEffect } from 'react'
import useAddItem from './hooks/useAddItem'
import { Button } from 'flowbite-react'

interface IFormInputs {
  itemNumber: string
  itemDescription: string
  itemUM: string
  minInventory: number
  maxInventory: number
}

export interface IFormFields {
  name: keyof IFormInputs
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

const formFields: IFormFields[] = [
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

const ItemForm = ({
  selectedItem,
  updateItem,
  updatingItem,
  action,
}: {
  selectedItem?: IItem
  updateItem?: (item: IItem) => void
  updatingItem?: boolean
  action?: () => void
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
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
    console.log('formFields', formFields)
    // const data = formFields

    // if (selectedItem && updateItem) {
    //   updateItem({ ...data, itemID: selectedItem.itemID } as IItem)
    // } else {
    //   await addItem(data as IItem).then(() => {
    //     reset()
    //     if (action) action()
    //   })
    // }
  }

  console.log('DSJKFHJDHF')

  return (
    <form className='' onSubmit={handleSubmit(handleAddOrEditItem)}>
      <div className='grid md:grid-cols-2 gap-4'>
        {formFields.map((field) => {
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
      <Button type='submit'>
        {selectedItem
          ? updatingItem
            ? 'Updating Item...'
            : 'Update Item'
          : isLoading
          ? 'Adding Item...'
          : 'Add Item'}
      </Button>
    </form>
  )
}

export default ItemForm
