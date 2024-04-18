import './style.scss'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { raiseFieldsErrors } from 'utils/raiseFieldsErrors'
import useParticipants from 'hooks/useParticipants'
import Input from 'components/molecules/Input'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import { EMealPreference } from 'models/mealPreference'
import Button from 'components/atoms/Button'
import Checkbox from 'components/atoms/Checkbox'
import { EMealType } from 'models/mealType'
import { PATHS } from 'utils/consts'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const methods = useForm()
  const navigate = useNavigate()
  const { createParticipant } = useParticipants()

  const formID = 'registerForm'

  const onSubmit = async (data: FieldValues) => {
    const { firstName, lastName } = data
    const mealPreference = data.mealPreference === '-' ? null : data.mealPreference
    const chosenMeals = Object.keys(data)
      .filter((key) => Object.values(EMealType).includes(key as EMealType))
      .filter((key) => data[key])
      .map((key) => key as EMealType)

    const response = await createParticipant(
      {
        firstName,
        lastName,
        mealPreference,
        chosenMeals
      },
      { preventDataRefreshAfterRequest: true }
    )

    if (!response.succeed && response.errors) {
      raiseFieldsErrors(response.errors, methods.setError)
    } else {
      navigate(PATHS.home)
    }
  }

  return (
    <main className="register-page">
      <FormProvider {...methods}>
        <form className="register-form" id={formID} onSubmit={methods.handleSubmit(onSubmit)}>
          <h1 className="register-form__title">Register a participant</h1>
          <Input
            name="firstName"
            placeholder="First Name"
            validators={{ required: valid.required, ...validSchemas.name }}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            validators={{ required: valid.required, ...validSchemas.name }}
          />
          <div className="register-form__options">
            <div className="register-form__options-select-items">
              <h3 className="register-form__select-title">Meal preference</h3>
              <select
                id="mealPreference"
                className="register-form__select"
                {...methods.register('mealPreference')}>
                <option>-</option>
                <option value={EMealPreference.Carnivorous}>Carnivorous</option>
                <option value={EMealPreference.Vegetarian}>Vegetarian</option>
              </select>
            </div>
            <Checkbox name={EMealType.Breakfast}>Breakfast</Checkbox>
            <Checkbox name={EMealType.Dinner}>Dinner</Checkbox>
            <Checkbox name={EMealType.Supper}>Supper</Checkbox>
          </div>
          <Button className="register-form__submit-btn" type="submit" form={formID}>
            Register
          </Button>
        </form>
      </FormProvider>
    </main>
  )
}

export default RegisterPage
