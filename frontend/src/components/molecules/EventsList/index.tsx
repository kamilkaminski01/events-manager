import './style.scss'
import { EventsListProps } from './interface'
import { useModals } from 'providers/modals/context'
import EditIcon from 'assets/icons/edit-icon.svg'
import DeleteIcon from 'assets/icons/delete-icon.svg'
import DeletionModal from 'components/molecules/DeletionModal'
import { ENDPOINTS, PATHS } from 'utils/consts'
import useEvent from 'hooks/useEvent'
import EventEdition from './partials/modals/EventEdition'
import ParticipantsModal from 'components/molecules/ParticipantsModal'
import classNames from 'classnames'
import { useContext } from 'react'
import { ParticipantsContext } from 'providers/participants/context'
import { FieldValues } from 'react-hook-form'
import { filterParticipantsIds, filterEventsParticipantsIds } from 'utils/filterParticipantsIds'
import { generatePath, Link } from 'react-router-dom'

const EventsList = ({ events }: EventsListProps) => {
  const { participantsData } = useContext(ParticipantsContext)
  const { openModal, closeModal } = useModals()
  const { updateEvent, deleteEvent } = useEvent()

  const onDeleteSubmit = async (id: number) => {
    const response = await deleteEvent(ENDPOINTS.eventDetails, id)

    if (response.succeed) {
      closeModal()
    }
  }

  const onParticipantsSubmit = async (id: number, data: FieldValues) => {
    const participants = filterParticipantsIds(data)

    const response = await updateEvent({ participants }, id)

    if (response.succeed) {
      closeModal()
    }
  }

  return (
    <>
      {events?.map((event) => (
        <div key={event.id} className="event">
          <Link to={generatePath(PATHS.eventDetails, { id: event.id })}>{event.name}</Link>
          <>
            {event.host ? (
              <Link to={generatePath(PATHS.participantDetails, { id: event.host.id })}>
                {event.host.firstName} {event.host.lastName}
              </Link>
            ) : (
              <span>-</span>
            )}
          </>
          <span
            className={classNames('event__participants', {
              'event__participants--populated': event.participants.length > 0,
              'event__participants--empty': event.participants.length === 0
            })}
            onClick={() => {
              const handleSubmit = (data: FieldValues) => {
                onParticipantsSubmit(event.id, data)
              }

              openModal(
                <ParticipantsModal
                  participants={participantsData}
                  participantsIds={filterEventsParticipantsIds(event.participants)}
                  onSubmit={handleSubmit}
                />
              )
            }}>
            {event.participants.length ? 'Show participants' : 'Add participants'}
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
                    title="Event"
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
