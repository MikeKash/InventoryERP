import { Link } from 'react-router-dom'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { isCorrectEmailFormat } from '../utils/validators'
import SubmitButton from '../components/SubmitButton'
import useLogin from '../api/react-query/useLogin'

interface IFormInputs {
  userEmail: string
  password: string
}
export interface IFormFields {
  name: keyof IFormInputs
  displayName: string
  defaultValue: string
  validationOptions: {
    required: boolean
    validate?: any
  }
  errMsgs: {
    [key: string]: string
  }
}

const initialFormValues = {
  userEmail: 'tony@stark.com',
  password: '123456789',
}
export const formFields: IFormFields[] = [
  {
    name: 'userEmail',
    displayName: 'Email Address',
    defaultValue: initialFormValues.userEmail,
    validationOptions: {
      required: true,
      validate: {
        validEmailFormat: (value: string) => isCorrectEmailFormat(value),
      },
    },
    errMsgs: {
      required: 'Email is required',
      validEmailFormat: 'Email format is invalid',
    },
  },
  {
    name: 'password',
    displayName: 'Password',
    defaultValue: initialFormValues.password,
    validationOptions: {
      required: true,
    },
    errMsgs: {
      required: 'Password is required',
    },
  },
]

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { mutateAsync: login } = useLogin()

  const handleLogin: SubmitHandler<FieldValues> = async (formFields) => {
    const { userEmail, password } = formFields
    login({ userEmail, password })
  }

  return (
    <div className='flex justify-center items-center flex-wrap g-6'>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='rounded shadow-lg border slate-100 p-6 w-[350px]'
      >
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-lg font-semibold	text-left'>Login</h3>
          <Link
            to='/register'
            className='text-sm text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'
          >
            Don't have an account?
          </Link>
        </div>

        {formFields.map((field) => {
          const { name, defaultValue, validationOptions, errMsgs, displayName } = field

          return (
            <div key={`form-field-${name}`} className='mb-4'>
              <label htmlFor={displayName} className='block text-sm mb-1'>
                {displayName}
              </label>
              <input
                autoComplete='current-password'
                id={name}
                type={name === 'password' ? 'password' : 'text'}
                className='form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                placeholder={`Please enter ${displayName.toLowerCase()}`}
                defaultValue={defaultValue}
                {...register(name, validationOptions)}
              />
              {errors[name] ? (
                <p className='text-red-600'>{errMsgs[errors[name]?.type as string]}</p>
              ) : null}
            </div>
          )
        })}

        <div className='flex justify-between items-center mb-6 text-sm'>
          <a href='#!' className='text-gray-800'>
            Forgot password?
          </a>
        </div>

        <SubmitButton type='submit'>Login</SubmitButton>
      </form>
    </div>
  )
}

export default Login
