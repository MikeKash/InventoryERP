import { PropsWithChildren } from 'react'
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'

const AuthForm = ({
  handleSubmit,
  handleLogin,
  children,
}: {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  handleLogin: SubmitHandler<FieldValues>
} & PropsWithChildren) => {
  return (
    <div className='flex justify-center items-center flex-wrap g-6'>
      <form
        onSubmit={() => handleSubmit(handleLogin)}
        className='rounded shadow-lg border slate-100 p-6 w-[350px]'
      >
        {children}
      </form>
    </div>
  )
}

export default AuthForm
