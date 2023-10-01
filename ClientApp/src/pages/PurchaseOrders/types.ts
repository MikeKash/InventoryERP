import { IPagination } from '../types'

export interface IPurchaseOrder {
  itemDescription: string
  itemID: string
  itemNumber: string
  itemUM: string
  maxInventory: number
  minInventory: number
  stockQty: number
  autoReorder: boolean
}

export interface IPurchaseOrders extends IPagination {
  purchaseOrders: IPurchaseOrder[]
}

interface IPurchaseOrderFormInputs {
  itemNumber: string
  itemDescription: string
  itemUM: string
  minInventory: number
  maxInventory: number
}

export interface IPurchaseOrderFormFields {
  name: keyof IPurchaseOrderFormInputs
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
