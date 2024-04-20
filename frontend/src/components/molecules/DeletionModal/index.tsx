import { DeletionModalProps } from './interface'
import Modal from 'components/organisms/Modal'

const DeletionModal = ({ deleteName, onSubmit }: DeletionModalProps) => {
  return (
    <Modal title="Delete participant" buttonText="Delete" onSubmit={onSubmit}>
      Are you sure that you want to delete {deleteName}?
    </Modal>
  )
}

export default DeletionModal
