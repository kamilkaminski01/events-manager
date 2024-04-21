import { ParticipantsListProps } from './interface'
import './style.scss'
import TrueIcon from 'assets/icons/true-icon.svg'
import FalseIcon from 'assets/icons/false-icon.svg'
import EditIcon from 'assets/icons/edit-icon.svg'
import DeleteIcon from 'assets/icons/delete-icon.svg'
import { useModals } from 'providers/modals/context'
import DeletionModal from 'components/molecules/DeletionModal'
import ParticipantEdition from './partials/modals/ParticipantEdition'
import useParticipant from 'hooks/useParticipant'
import { ENDPOINTS, PATHS } from 'utils/consts'
import { generatePath, Link } from 'react-router-dom'

const ParticipantsList = ({ participants }: ParticipantsListProps) => {
  const { openModal, closeModal } = useModals()
  const { deleteParticipant } = useParticipant()

  const onDeleteSubmit = async (id: number) => {
    const response = await deleteParticipant(ENDPOINTS.participantDetails, id)

    if (response.succeed) {
      closeModal()
    }
  }

  return (
    <>
      {participants?.map((participant) => (
        <div key={participant.id} className="participant">
          <Link to={generatePath(PATHS.participantDetails, { id: participant.id })}>
            {participant.firstName}
          </Link>
          <span>{participant.lastName}</span>
          <span>
            {participant.isHost ? (
              <img src={TrueIcon} alt="Host" />
            ) : (
              <img src={FalseIcon} alt="Not host" />
            )}
          </span>
          <span>{participant.mealPreference ? participant.mealPreference : '-'}</span>
          <span>
            <>
              {participant.chosenMeals.length
                ? participant.chosenMeals.map((chosenMeal, key) => <p key={key}>{chosenMeal}</p>)
                : '-'}
            </>
          </span>
          <span className="actions">
            <img
              src={EditIcon}
              alt="Edit"
              onClick={() =>
                openModal(
                  <ParticipantEdition
                    id={participant.id}
                    firstName={participant.firstName}
                    lastName={participant.lastName}
                    chosenMealPreference={participant.mealPreference}
                    chosenMeals={participant.chosenMeals}
                  />
                )
              }
            />
            <img
              src={DeleteIcon}
              alt="Delete"
              onClick={() =>
                openModal(
                  <DeletionModal
                    title="Participant"
                    deleteName={`${participant.firstName} ${participant.lastName}`}
                    onSubmit={() => onDeleteSubmit(participant.id)}
                  />
                )
              }
            />
          </span>
        </div>
      ))}
    </>
  )
}

export default ParticipantsList
