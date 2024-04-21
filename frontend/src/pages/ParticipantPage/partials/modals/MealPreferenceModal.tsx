import Modal from 'components/organisms/Modal'
import { useModals } from 'providers/modals/context'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { handleApiResponse } from 'utils/handleApiResponse'
import { ParticipantDataModalProps } from './_interface'
import useParticipant from 'hooks/useParticipant'
import Select from 'components/atoms/Select'
import { EMealPreference } from 'models/mealPreference.ts'

const MealPreferenceModal = ({
  participantId,
  getParticipant,
  chosenMealPreference
}: ParticipantDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateParticipant } = useParticipant()

  const formID = 'mealPreferenceForm'

  const onSubmit = async (formValues: FieldValues) => {
    const mealPreference = formValues.mealPreference === '-' ? null : formValues.mealPreference

    const response = await updateParticipant({ mealPreference }, participantId)
    getParticipant(participantId)

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title="Update meal preference" buttonText="Update" formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Select
            name="mealPreference"
            options={[
              { value: EMealPreference.Carnivorous, text: 'Carnivorous' },
              { value: EMealPreference.Vegetarian, text: 'Vegetarian' }
            ]}
            defaultValue={chosenMealPreference ? chosenMealPreference.toUpperCase() : undefined}
            blankOption
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default MealPreferenceModal
