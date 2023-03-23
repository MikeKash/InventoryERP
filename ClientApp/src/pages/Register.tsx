import { AxiosError } from 'axios'
import { FieldValues, SubmitHandler, useForm, Validate } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import SubmitButton from '../components/SubmitButton'
import axios from '../api/axios'
import { isCorrectEmailFormat } from '../utils/validators'
interface IFormInputs {
  userEmail: string
  userName: string
  password: string
  companyName: string
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
  userEmail: '',
  userName: '',
  companyName: '',
  password: '',
}
export const formFields: IFormFields[] = [
  {
    name: 'userName',
    displayName: 'Full Name',
    defaultValue: initialFormValues.userName,
    validationOptions: {
      required: true,
    },
    errMsgs: {
      required: 'Username is required',
    },
  },
  {
    name: 'companyName',
    displayName: 'Company Name',
    defaultValue: initialFormValues.companyName,
    validationOptions: {
      required: true,
    },
    errMsgs: {
      required: 'Company name is required',
    },
  },
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

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleRegister: SubmitHandler<FieldValues> = async (formFields) => {
    const { userEmail, userName, password, companyName } = formFields

    try {
      const response = await axios.post('/api/Auth/register', {
        userEmail,
        userName,
        password,
        companyName,
      })
      if (response.data.message === 'registered') navigate('/login', { replace: true })
    } catch (err) {
      if ((err as AxiosError)?.response?.data === 'User already exists') {
        alert('User already exists')
      } else {
        alert('Something went wrong')
      }
    }
  }

  return (
    <div className='flex justify-center items-center flex-wrap g-6'>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='rounded shadow-lg border slate-100 p-6 w-[350px]'
      >
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-lg font-semibold	text-left'>Sign up</h3>
          <Link
            to='/login'
            className='text-sm text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'
          >
            Already have an account?
          </Link>
        </div>
        {formFields.map((field) => {
          const { name, defaultValue, validationOptions, errMsgs, displayName } = field

          return (
            <div key={`form-field-${name}`} className='mb-6'>
              <label htmlFor={displayName} className='block text-sm mb-1'>
                {`${displayName} ${validationOptions.required ? '*' : ''}`}
              </label>
              <input
                autoComplete={name === 'password' ? 'new-password' : 'off'}
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

        <div className='text-center'>
          <SubmitButton type='submit'>Register</SubmitButton>
        </div>
      </form>
    </div>
  )
}

export default Register
