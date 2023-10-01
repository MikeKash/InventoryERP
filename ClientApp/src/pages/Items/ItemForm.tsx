import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { IItem, IItemFormFields } from './types'
import { Button } from 'flowbite-react'

export const ItemForm = ({
  selectedItem,
  register,
  errors,
  itemFormFields,
}: {
  selectedItem?: IItem | undefined
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  itemFormFields: IItemFormFields[]
}) => (
  <form>
    <div className='grid md:grid-cols-2 gap-4'>
      {itemFormFields.map((field) => {
        const { name, defaultValue, validationOptions, errMsgs, displayName } = field

        return (
          <div key={`form-field-${name}`}>
            <label htmlFor={displayName} className='block text-sm mb-1'>
              {`${displayName} ${validationOptions.required ? '*' : ''}`}
            </label>
            <input
              key={`input-${name}`}
              id={name}
              className='form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              placeholder={`Please enter ${displayName.toLowerCase()}`}
              defaultValue={defaultValue}
              disabled={name === 'itemNumber' && selectedItem ? true : false}
              {...register(name, validationOptions)}
            />
            {errors[name] ? (
              <p className='text-red-600'>{errMsgs?.[errors[name]?.type as string]}</p>
            ) : null}
          </div>
        )
      })}
    </div>
  </form>
)

export const ItemFormSubmitBtn = ({
  handleSubmit,
  handleAddOrEditItem,
  selectedItem,
  updatingItem,
  isLoading,
}: {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  handleAddOrEditItem: SubmitHandler<FieldValues>
  selectedItem?: IItem | undefined
  updatingItem: boolean
  isLoading: boolean
}) => (
  <Button onClick={handleSubmit(handleAddOrEditItem)}>
    {selectedItem
      ? updatingItem
        ? 'Updating Item...'
        : 'Update Item'
      : isLoading
      ? 'Adding Item...'
      : 'Add Item'}
  </Button>
)
