import { Card } from 'flowbite-react'
import useItemForm from './hooks/useItemForm'
import { ItemForm, ItemFormSubmitBtn } from './ItemForm'
const NewItem = () => {
  const {
    register,
    errors,
    itemFormFields,
    handleSubmit,
    handleAddOrEditItem,
    updatingItem,
    isLoading,
  } = useItemForm({})

  return (
    <div className='m-4'>
      <Card>
        <h1 className='font-bold text-xl'>Add New Item</h1>
        <ItemForm register={register} errors={errors} itemFormFields={itemFormFields} />
        <div>
          <ItemFormSubmitBtn
            handleSubmit={handleSubmit}
            handleAddOrEditItem={handleAddOrEditItem}
            updatingItem={updatingItem}
            isLoading={isLoading}
          />
        </div>
      </Card>
    </div>
  )
}

export default NewItem
