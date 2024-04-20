import './style.scss'
import { ParticipantsModalProps } from './interface'
import Modal from 'components/organisms/Modal'
import { FormProvider, useForm, FieldValues } from 'react-hook-form'
import { filterParticipantsIds } from 'utils/filterParticipantsIds'
import { useModals } from 'providers/modals/context'

const ParticipantsModal = ({
  participants,
  participantsIds,
  setParticipantsIds,
  onSubmit
}: ParticipantsModalProps) => {
  const { closeModal } = useModals()
  const methods = useForm()

  const formID = 'participantsForm'

  const onCreationSubmit = (data: FieldValues) => {
    const participantsIds = filterParticipantsIds(data)

    setParticipantsIds && setParticipantsIds(participantsIds)
    closeModal()
  }

  return (
    <FormProvider {...methods}>
      <Modal
        title="Select participants"
        buttonText="Confirm"
        formID={formID}
        onSubmit={methods.handleSubmit(onSubmit ? onSubmit : onCreationSubmit)}>
        <form id={formID} className="participants__modal-participant">
          {participants.map((participant) => (
            <label className="participant-checkbox-wrapper" key={participant.id}>
              <input
                className="participant-checkbox-wrapper__checkbox"
                data-testid={participant.id}
                type="checkbox"
                defaultChecked={participantsIds.includes(participant.id)}
                {...methods.register(`${participant.id}`)}
              />
              <span className="participant-checkbox-wrapper__indicator" />
              <p className="participant-checkbox-wrapper__content">
                {participant.firstName} {participant.lastName}
              </p>
            </label>
          ))}
        </form>
      </Modal>
    </FormProvider>
  )
}

export default ParticipantsModal
