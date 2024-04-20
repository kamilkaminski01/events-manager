import './style.scss'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { raiseFieldsErrors } from 'utils/raiseFieldsErrors'
import useParticipant from 'hooks/useParticipant'
import Input from 'components/molecules/Input'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import Button from 'components/atoms/Button'
import { PATHS } from 'utils/consts'
import { useNavigate } from 'react-router-dom'
import { useModals } from 'providers/modals/context'
import MealOptionsModal from 'components/organisms/MealOptionsModal'
import { useState } from 'react'
import { IMealOptions } from 'models/mealOptions'

const RegisterParticipantPage = () => {
  const methods = useForm()
  const navigate = useNavigate()
  const { openModal } = useModals()
  const { createParticipant } = useParticipant()
  const [mealOptionsData, setMealOptionsData] = useState<IMealOptions>({
    mealPreference: null,
    chosenMeals: []
  })

  const formID = 'registerParticipantForm'

  const onSubmit = async (data: FieldValues) => {
    const { firstName, lastName } = data
    const { mealPreference, chosenMeals } = mealOptionsData

    const response = await createParticipant({
      firstName,
      lastName,
      mealPreference,
      chosenMeals
    })

    if (!response.succeed && response.errors) {
      raiseFieldsErrors(response.errors, methods.setError)
    } else {
      navigate(PATHS.home)
    }
  }

  return (
    <main className="register-participant-page">
      <FormProvider {...methods}>
        <form
          className="register-participant-form"
          id={formID}
          onSubmit={methods.handleSubmit(onSubmit)}>
          <h1 className="register-participant-form__title">Register a participant</h1>
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
          <Button
            className="btn--outline"
            type="button"
            onClick={() =>
              openModal(
                <MealOptionsModal
                  mealOptionsData={mealOptionsData}
                  setMealOptionsData={setMealOptionsData}
                />
              )
            }>
            Meal options
          </Button>
          <Button type="submit" form={formID}>
            Register
          </Button>
        </form>
      </FormProvider>
    </main>
  )
}

export default RegisterParticipantPage
