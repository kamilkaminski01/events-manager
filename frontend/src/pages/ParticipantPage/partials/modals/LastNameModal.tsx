import Input from 'components/molecules/Input'
import Modal from 'components/organisms/Modal'
import useParticipant from 'hooks/useParticipant'
import { useModals } from 'providers/modals/context'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { handleApiResponse } from 'utils/handleApiResponse'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import { ParticipantDataModalProps } from './_interface'

const LastNameModal = ({
  participantId,
  getParticipant,
  defaultValue
}: ParticipantDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateParticipant } = useParticipant()

  const formID = 'lastNameForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { lastName } = formValues

    const response = await updateParticipant({ lastName }, participantId)
    getParticipant(participantId)

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title="Update last name" buttonText="Update" formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="lastName"
            placeholder="Last name"
            defaultValue={defaultValue}
            validators={{ required: valid.required, ...validSchemas.name }}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default LastNameModal
