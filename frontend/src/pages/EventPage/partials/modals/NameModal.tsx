import Input from 'components/molecules/Input'
import Modal from 'components/organisms/Modal'
import { useModals } from 'providers/modals/context'
import { EventDataModalProps } from './_interface'
import useEvent from 'hooks/useEvent'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import { handleApiResponse } from 'utils/handleApiResponse'

const NameModal = ({ eventId, getEvent, defaultValue }: EventDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateEvent } = useEvent()

  const formID = 'nameForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { name } = formValues

    const response = await updateEvent({ name }, eventId)
    getEvent(eventId)

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title="Update name" buttonText="Update" formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="name"
            placeholder="Event name"
            defaultValue={typeof defaultValue === 'string' ? defaultValue : undefined}
            validators={{ required: valid.required, ...validSchemas.eventName }}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default NameModal
