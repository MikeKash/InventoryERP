import { IItemFormFields } from '../types'

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
