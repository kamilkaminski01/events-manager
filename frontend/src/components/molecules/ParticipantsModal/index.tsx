import './style.scss'
import { ParticipantsModalProps } from './interface'
import Modal from 'components/organisms/Modal'
import { FormProvider, useForm, FieldValues } from 'react-hook-form'
import { filterParticipantsIds } from 'utils/filterParticipantsIds'
import { participantsWithoutEventHost } from 'utils/filterNotHostsParticipants'
import { useModals } from 'providers/modals/context'
import { useContext } from 'react'
import { AuthContext } from 'providers/auth/context'

const ParticipantsModal = ({
  participants,
  participantsIds,
  setParticipantsIds,
  onSubmit,
  eventsHostId
}: ParticipantsModalProps) => {
  const { isLogged } = useContext(AuthContext)
  const { closeModal } = useModals()
  const methods = useForm()

  const formID = 'participantsForm'

  const transformedParticipants = eventsHostId
    ? participantsWithoutEventHost(participants, eventsHostId)
    : participants

  const onCreationSubmit = (data: FieldValues) => {
    const participantsIds = filterParticipantsIds(data)

    setParticipantsIds && setParticipantsIds(participantsIds)
    closeModal()
  }

  return (
    <FormProvider {...methods}>
      <Modal
        title={isLogged ? 'Select participants' : 'Participants'}
        buttonText="Confirm"
        formID={formID}
        onSubmit={methods.handleSubmit(onSubmit ? onSubmit : onCreationSubmit)}>
        <form id={formID} className="participants__modal-participant">
          {isLogged ? (
            transformedParticipants.length ? (
              transformedParticipants.map((participant) => (
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
              ))
            ) : (
              <div>No participants to select from</div>
            )
          ) : transformedParticipants.filter((participant) =>
              participantsIds.includes(participant.id)
            ).length ? (
            transformedParticipants
              .filter((participant) => participantsIds.includes(participant.id))
              .map((participant, index) => (
                <p className="participant-checkbox-wrapper__content" key={participant.id}>
                  {index + 1}. {participant.firstName} {participant.lastName}
                </p>
              ))
          ) : (
            <div>No participants</div>
          )}
        </form>
      </Modal>
    </FormProvider>
  )
}

export default ParticipantsModal
