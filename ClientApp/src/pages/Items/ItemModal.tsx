import { Modal } from 'flowbite-react'
import { IItem } from './types'
import useItemForm from './hooks/useItemForm'

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
  const { ItemForm, ItemFormSubmitBtn, reset } = useItemForm({
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
        <ItemForm />
      </Modal.Body>
      <Modal.Footer>
        <ItemFormSubmitBtn />
      </Modal.Footer>
    </Modal>
  )
}

export default ItemModal
