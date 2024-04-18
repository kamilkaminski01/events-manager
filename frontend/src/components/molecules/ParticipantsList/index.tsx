import { ParticipantsListProps } from './interface'
import './style.scss'
import TrueIcon from 'assets/icons/true-icon.svg'
import FalseIcon from 'assets/icons/false-icon.svg'
import EditIcon from 'assets/icons/edit-icon.svg'
import DeleteIcon from 'assets/icons/delete-icon.svg'

const ParticipantsList = ({ participants }: ParticipantsListProps) => {
  return (
    <>
      {participants?.map((participant, id) => (
        <div key={id} className="participant">
          <span>{participant.firstName}</span>
          <span>{participant.lastName}</span>
          <span>{participant.isHost ? <img src={TrueIcon} /> : <img src={FalseIcon} />}</span>
          <span>{participant.mealPreference ? participant.mealPreference : '-'}</span>
          <span>
            <>
              {participant.chosenMeals.length
                ? participant.chosenMeals.map((chosenMeal, key) => <p key={key}>{chosenMeal}</p>)
                : '-'}
            </>
          </span>
          <span className="participant__actions">
            <img src={EditIcon} /> <img src={DeleteIcon} />
          </span>
        </div>
      ))}
    </>
  )
}

export default ParticipantsList
