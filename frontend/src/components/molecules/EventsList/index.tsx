import './style.scss'
import { EventsListProps } from './interface'
import { useModals } from 'providers/modals/context'
import EditIcon from 'assets/icons/edit-icon.svg'
import DeleteIcon from 'assets/icons/delete-icon.svg'
import DeletionModal from 'components/molecules/DeletionModal'
import { ENDPOINTS } from 'utils/consts'
import useEvent from 'hooks/useEvent'
import EventEdition from './partials/modals/EventEdition'

const EventsList = ({ events }: EventsListProps) => {
  const { openModal, closeModal } = useModals()
  const { deleteEvent } = useEvent()

  const onDeleteSubmit = async (id: number) => {
    const response = await deleteEvent(ENDPOINTS.eventDetails, id)

    if (response.succeed) {
      closeModal()
    }
  }

  return (
    <>
      {events?.map((event, id) => (
        <div key={id} className="event">
          <span>{event.name}</span>
          <span>{event.host ? `${event.host.firstName} ${event.host.lastName}` : '-'}</span>
          <span className="event__participants">
            {event.participants.map((participant) => (
              <span key={participant.id}>
                {participant.firstName} {participant.lastName}
              </span>
            ))}
          </span>
          <span className="actions">
            <img
              src={EditIcon}
              alt="Edit"
              onClick={() =>
                openModal(<EventEdition id={event.id} name={event.name} host={event.host} />)
              }
            />
            <img
              src={DeleteIcon}
              alt="Delete"
              onClick={() =>
                openModal(
                  <DeletionModal
                    deleteName={event.name}
                    onSubmit={() => onDeleteSubmit(event.id)}
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

export default EventsList
