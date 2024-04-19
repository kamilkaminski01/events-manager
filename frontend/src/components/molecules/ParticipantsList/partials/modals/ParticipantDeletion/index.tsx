import Modal from 'components/organisms/Modal'
import useParticipant from 'hooks/useParticipant'
import { ParticipantDeletionModalProps } from './interface'
import { useModals } from 'providers/modals/context'
import { ENDPOINTS } from 'utils/consts'

const ParticipantDeletionModal = ({ id, firstName, lastName }: ParticipantDeletionModalProps) => {
  const { closeModal } = useModals()
  const { deleteParticipant } = useParticipant()

  const onSubmit = async () => {
    const response = await deleteParticipant(ENDPOINTS.participantDetails, id)

    if (response.succeed) {
      closeModal()
    }
  }

  return (
    <Modal title="Delete participant" buttonText="Delete" onSubmit={onSubmit}>
      {`Are you sure that you want to delete ${firstName} ${lastName}?`}
    </Modal>
  )
}

export default ParticipantDeletionModal
