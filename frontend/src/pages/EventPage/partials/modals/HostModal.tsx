import Modal from 'components/organisms/Modal'
import { useModals } from 'providers/modals/context'
import { EventDataModalProps } from './_interface'
import useEvent from 'hooks/useEvent'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { handleApiResponse } from 'utils/handleApiResponse'
import Select from 'components/atoms/Select'
import { notHostsParticipantsOptions } from 'utils/filterNotHostsParticipants'
import { useContext } from 'react'
import { ParticipantsContext } from 'providers/participants/context'

const HostModal = ({ eventId, getEvent, defaultHost }: EventDataModalProps) => {
  const { participantsData } = useContext(ParticipantsContext)
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateEvent } = useEvent()

  const formID = 'hostForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { hostId } = formValues

    const response = await updateEvent({ hostId }, eventId)
    getEvent(eventId)

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title="Update host" buttonText="Update" formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="event-edition__host">
            <p className="event-edition__host-title">Events host</p>
            <Select
              name="hostId"
              options={notHostsParticipantsOptions(participantsData)}
              defaultOption={
                defaultHost
                  ? {
                      value: defaultHost.id,
                      text: `${defaultHost.id} - ${defaultHost.firstName} ${defaultHost.lastName}`
                    }
                  : undefined
              }
            />
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default HostModal
