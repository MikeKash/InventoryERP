import { Button, Modal } from 'flowbite-react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useAddItem from './hooks/useAddItem'

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

const ItemModal = ({ showModal, onClose }: { showModal: boolean; onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { mutateAsync: addItem, isLoading } = useAddItem()

  const handleAddItem: SubmitHandler<FieldValues> = async (formFields) => {
    const data = formFields
    await addItem(data).then(() => {
      reset()
      onClose()
    })
  }

  const closeModal = () => {
    reset()
    onClose()
  }

  return (
    <Modal show={showModal} onClose={() => closeModal()}>
      <form className='' onSubmit={handleSubmit(handleAddItem)}>
        <Modal.Header>Add New Item</Modal.Header>
        <Modal.Body>
          {formFields.map((field) => {
            const { name, defaultValue, validationOptions, errMsgs, displayName } = field

            return (
              <div key={`form-field-${name}`} className='mb-6'>
                <label htmlFor={displayName} className='block text-sm mb-1'>
                  {`${displayName} ${validationOptions.required ? '*' : ''}`}
                </label>
                <input
                  key={`input-${name}`}
                  id={name}
                  className='form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  placeholder={`Please enter ${displayName.toLowerCase()}`}
                  defaultValue={defaultValue}
                  {...register(name, validationOptions)}
                />
                {errors[name] ? (
                  <p className='text-red-600'>{errMsgs?.[errors[name]?.type as string]}</p>
                ) : null}
              </div>
            )
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'>{isLoading ? 'Adding Item...' : 'Add Item'}</Button>
          <Button color='gray' onClick={() => closeModal()}>
            Cancel
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ItemModal
