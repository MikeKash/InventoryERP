import { Card } from 'flowbite-react'
import useItemForm from './hooks/useItemForm'
const NewItem = () => {
  const { ItemForm, ItemFormSubmitBtn } = useItemForm({})

  return (
    <div className='m-4'>
      <Card>
        <h1 className='font-bold text-xl'>Add New Item</h1>
        <ItemForm />
        <div>
          <ItemFormSubmitBtn />
        </div>
      </Card>
    </div>
  )
}

export default NewItem
