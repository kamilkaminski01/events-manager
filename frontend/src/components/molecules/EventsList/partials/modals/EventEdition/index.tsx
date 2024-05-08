import './style.scss'
import { EventEditionProps } from './interface'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import Modal from 'components/organisms/Modal'
import Input from 'components/molecules/Input'
import Select from 'components/atoms/Select'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import { useModals } from 'providers/modals/context'
import { handleApiResponse } from 'utils/handleApiResponse'
import useEvent from 'hooks/useEvent'
import { notHostsParticipantsOptions } from 'utils/filterNotHostsParticipants'
import { useContext } from 'react'
import { ParticipantsContext } from 'providers/participants/context'

const EventEditionModal = ({ id, name, host }: EventEditionProps) => {
  const { participantsData } = useContext(ParticipantsContext)
  const { closeModal } = useModals()
  const { updateEvent } = useEvent()
  const methods = useForm()

  const formID = 'eventForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { name, hostId } = formValues

    const response = await updateEvent({ name, hostId }, id)

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title="Edit event" buttonText="Confirm" formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="name"
            placeholder="Name"
            defaultValue={name}
            validators={{ required: valid.required, ...validSchemas.eventName }}
          />
          <div className="event-edition__host">
            <p className="event-edition__host-title">Events host</p>
            <Select
              name="hostId"
              options={notHostsParticipantsOptions(participantsData)}
              defaultOption={
                host && {
                  value: host.id,
                  text: `${host?.id} - ${host?.firstName} ${host?.lastName}`
                }
              }
            />
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default EventEditionModal
