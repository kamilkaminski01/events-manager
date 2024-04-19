import { ParticipantsListProps } from './interface'
import './style.scss'
import TrueIcon from 'assets/icons/true-icon.svg'
import FalseIcon from 'assets/icons/false-icon.svg'
import EditIcon from 'assets/icons/edit-icon.svg'
import DeleteIcon from 'assets/icons/delete-icon.svg'
import { useModals } from 'providers/modals/context'
import ParticipantDeletionModal from './partials/modals/ParticipantDeletion'
import ParticipantEdition from 'components/molecules/ParticipantsList/partials/modals/ParticipantEdition'

const ParticipantsList = ({ participants, getParticipants }: ParticipantsListProps) => {
  const { openModal } = useModals()

  return (
    <>
      {participants?.map((participant, id) => (
        <div key={id} className="participant">
          <span>{participant.firstName}</span>
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
          <span className="participant__actions">
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
                    getParticipants={getParticipants}
                  />
                )
              }
            />
            <img
              src={DeleteIcon}
              alt="Delete"
              onClick={() =>
                openModal(
                  <ParticipantDeletionModal
                    id={participant.id}
                    firstName={participant.firstName}
                    lastName={participant.lastName}
                    getParticipants={getParticipants}
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
