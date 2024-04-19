import Modal from 'components/organisms/Modal'
import useParticipant from 'hooks/useParticipant'
import { ParticipantDeletionModalProps } from './interface'
import { useModals } from 'providers/modals/context'

const ParticipantDeletionModal = ({
  id,
  firstName,
  lastName,
  getParticipants
}: ParticipantDeletionModalProps) => {
  const { closeModal } = useModals()
  const { deleteParticipant } = useParticipant(id)

  const onSubmit = async () => {
    const response = await deleteParticipant()

    if (response.succeed) {
      closeModal()
      getParticipants()
    }
  }

  return (
    <Modal title="Delete participant" buttonText="Delete" onSubmit={onSubmit}>
      {`Are you sure that you want to delete ${firstName} ${lastName}?`}
    </Modal>
  )
}

export default ParticipantDeletionModal
