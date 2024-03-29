import { IPagination } from '../types'

export interface IItem {
  itemDescription: string
  itemID: string
  itemNumber: string
  itemUM: string
  maxInventory: number
  minInventory: number
  stockQty: number
  autoReorder: boolean
}

export interface IItems extends IPagination {
  items: IItem[]
}

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
