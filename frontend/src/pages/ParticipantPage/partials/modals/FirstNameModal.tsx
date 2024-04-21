import Input from 'components/molecules/Input'
import Modal from 'components/organisms/Modal'
import { useModals } from 'providers/modals/context'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { handleApiResponse } from 'utils/handleApiResponse'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import { ParticipantDataModalProps } from './_interface'
import useParticipant from 'hooks/useParticipant'

const FirstNameModal = ({
  participantId,
  getParticipant,
  defaultValue
}: ParticipantDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateParticipant } = useParticipant()

  const formID = 'firstNameForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { firstName } = formValues

    const response = await updateParticipant({ firstName }, participantId)
    getParticipant(participantId)

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title="Update first name" buttonText="Update" formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="firstName"
            placeholder="First name"
            defaultValue={defaultValue}
            validators={{ required: valid.required, ...validSchemas.name }}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default FirstNameModal
