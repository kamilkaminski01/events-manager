import Button from 'components/atoms/Button'
import ModalBaseStructure from 'components/atoms/ModalBaseStructure'
import { useModals } from 'providers/modals/context'
import { ModalProps } from './interface'
import './style.scss'
import { useContext } from 'react'
import { AuthContext } from 'providers/auth/context'

const Modal = ({ children, title, buttonText, formID, onSubmit }: ModalProps) => {
  const { isLogged } = useContext(AuthContext)
  const { closeModal } = useModals()

  return (
    <ModalBaseStructure>
      <div className="modal">
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">
          {isLogged ? (
            <>
              <Button className="modal__btn btn--outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button className="modal__btn" type="submit" form={formID} onClick={onSubmit}>
                {buttonText}
              </Button>
            </>
          ) : (
            <Button className="modal__btn" type="submit" onClick={closeModal}>
              Close
            </Button>
          )}
        </div>
      </div>
    </ModalBaseStructure>
  )
}

export default Modal
