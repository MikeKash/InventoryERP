import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IItem } from '../types'

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

const useItemForm = ({ selectedItem }: { selectedItem: IItem | undefined }) => {
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

  return {
    register,
    handleSubmit,
    errors,
    formFields,
    reset,
  }
}

export default useItemForm
