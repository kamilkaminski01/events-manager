import './style.scss'
import { FormProvider, useForm, FieldValues } from 'react-hook-form'
import Input from 'components/molecules/Input'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import Button from 'components/atoms/Button'
import useAuth from 'hooks/useAuth'
import Meta from 'components/atoms/Meta'

const LoginPage = () => {
  const { errorMessage, isLoading, login } = useAuth()
  const methods = useForm()
  const formID = 'loginForm'

  const onSubmit = (formValues: FieldValues) => {
    const { username, password } = formValues

    login({ username, password })
  }

  return (
    <main className="login-page">
      <Meta>
        <title>{'Events Manager'}</title>
      </Meta>
      <FormProvider {...methods}>
        <form className="login-page-form" id={formID} onSubmit={methods.handleSubmit(onSubmit)}>
          <h1 className="login-page-form__title">Login</h1>
          <Input
            name="username"
            placeholder="Username"
            validators={{ required: valid.required, ...validSchemas.username }}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            validators={{ required: valid.required }}
          />
          <Button type="submit" form={formID} disable={isLoading}>
            Submit
          </Button>
          {errorMessage && <p className="login-page-form__error-message">{errorMessage}</p>}
        </form>
      </FormProvider>
    </main>
  )
}

export default LoginPage
