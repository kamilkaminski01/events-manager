import Modal from 'components/organisms/Modal'
import { useModals } from 'providers/modals/context'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { handleApiResponse } from 'utils/handleApiResponse'
import { ParticipantDataModalProps } from './_interface'
import useParticipant from 'hooks/useParticipant'
import MealTypes from 'components/molecules/MealTypes'
import { filterChosenMeals } from 'utils/filterChosenMeals'

const MealTypesModal = ({
  participantId,
  getParticipant,
  chosenMeals
}: ParticipantDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateParticipant } = useParticipant()

  const formID = 'mealsForm'

  const onSubmit = async (formValues: FieldValues) => {
    const chosenMeals = filterChosenMeals(formValues)

    const response = await updateParticipant({ chosenMeals }, participantId)
    getParticipant(participantId)

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title="Update chosen meals" buttonText="Update" formID={formID}>
      <FormProvider {...methods}>
        <form
          id={formID}
          className="meal-types__modal-form"
          onSubmit={methods.handleSubmit(onSubmit)}>
          <MealTypes chosenMeals={chosenMeals ? chosenMeals : []} transformData />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default MealTypesModal
