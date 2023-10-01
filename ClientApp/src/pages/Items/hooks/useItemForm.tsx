import { useEffect } from 'react'
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form'
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
    search: debouncedSearch || '',
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

  return {
    reset,
    handleAddOrEditItem,
    register,
    handleSubmit,
    errors,
    isLoading,
    updatingItem,
    itemFormFields,
  }
}

export default useItemForm 
