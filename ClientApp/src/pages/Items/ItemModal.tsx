import { Modal } from 'flowbite-react'
import { IItem } from './types'
import useItemForm from './hooks/useItemForm'
import { ItemForm, ItemFormSubmitBtn } from './ItemForm'

const ItemModal = ({
  selectedItem,
  showModal,
  onClose,
  debouncedSearch,
  pageNumber,
  pageSize,
  sortBy,
  desc,
}: {
  selectedItem: IItem | undefined
  showModal: boolean
  onClose: () => void
  debouncedSearch?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  desc?: boolean
}) => {
  const {
    register,
    errors,
    reset,
    itemFormFields,
    handleSubmit,
    handleAddOrEditItem,
    updatingItem,
    isLoading,
  } = useItemForm({
    selectedItem,
    debouncedSearch,
    pageNumber,
    pageSize,
    sortBy,
    desc,
  })

  const closeModal = () => {
    onClose()
    pageNumber && reset()
  }

  return (
    <Modal show={showModal} onClose={() => closeModal()}>
      <Modal.Header>{selectedItem ? 'Update ' : 'Add New '}Item</Modal.Header>
      <Modal.Body>
        <ItemForm
          register={register}
          errors={errors}
          selectedItem={selectedItem}
          itemFormFields={itemFormFields}
        />
      </Modal.Body>
      <Modal.Footer>
        <ItemFormSubmitBtn
          handleSubmit={handleSubmit}
          handleAddOrEditItem={handleAddOrEditItem}
          updatingItem={updatingItem}
          isLoading={isLoading}
          selectedItem={selectedItem}
        />
      </Modal.Footer>
    </Modal>
  )
}

export default ItemModal
