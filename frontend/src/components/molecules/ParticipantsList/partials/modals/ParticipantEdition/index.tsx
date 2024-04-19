import { ParticipantEditionModalProps } from './interface'
import { useModals } from 'providers/modals/context'
import useParticipant from 'hooks/useParticipant.ts'
import Modal from 'components/organisms/Modal'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import Input from 'components/molecules/Input'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import { valid } from 'utils/Validators/validators'
import { handleApiResponse } from 'utils/handleApiResponse'
import MealTypes from 'components/molecules/MealTypes'
import MealPreference from 'components/molecules/MealPreference'
import { filterChosenMeals } from 'utils/filterChosenMeals'

const ParticipantEditionModal = ({
  id,
  firstName,
  lastName,
  chosenMealPreference,
  chosenMeals,
  getParticipants
}: ParticipantEditionModalProps) => {
  const { closeModal } = useModals()
  const { updateParticipant } = useParticipant(id)
  const methods = useForm()

  const formID = 'participantForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { firstName, lastName } = formValues
    const mealPreference = formValues.mealPreference === '-' ? null : formValues.mealPreference
    const chosenMeals = filterChosenMeals(formValues)

    const response = await updateParticipant({ firstName, lastName, mealPreference, chosenMeals })

    handleApiResponse(
      response,
      () => {
        closeModal()
        getParticipants()
      },
      methods.setError
    )
  }

  return (
    <Modal title="Edit participant" buttonText="Confirm" formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="firstName"
            placeholder="First name"
            defaultValue={firstName}
            validators={{ required: valid.required, ...validSchemas.name }}
          />
          <Input
            name="lastName"
            placeholder="Last name"
            defaultValue={lastName}
            validators={{ required: valid.required, ...validSchemas.name }}
          />
          <div className="modal__form--grouped">
            <MealPreference chosenMealPreference={chosenMealPreference} transformData={true} />
            <MealTypes chosenMeals={chosenMeals} transformData={true} />
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default ParticipantEditionModal
