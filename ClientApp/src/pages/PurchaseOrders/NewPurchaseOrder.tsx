import { Card } from 'flowbite-react'
import useItemForm from './hooks/usePurchaseOrderForm'

const NewPurchaseOrder = () => {
  const { PurchaseOrderForm, PurchaseOrderFormSubmitBtn } = useItemForm({})

  return (
    <div className='m-4'>
      <Card>
        <h1 className='font-bold text-xl'>Add New Item</h1>
        <PurchaseOrderForm />
        <div>
          <PurchaseOrderFormSubmitBtn />
        </div>
      </Card>
    </div>
  )
}

export default NewPurchaseOrder
