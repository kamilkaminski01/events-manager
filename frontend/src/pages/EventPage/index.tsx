import './style.scss'
import useEvent from 'hooks/useEvent'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from 'components/atoms/Spinner'
import EventDataTile from 'components/organisms/EventDataTile'
import DeletionTile from 'components/organisms/DeletionTile'

const EventPage = () => {
  const { event, getEvent, isError } = useEvent()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getEvent(id)
    }
  }, [id, getEvent])

  return (
    <main className="event-page">
      {event ? (
        <>
          <EventDataTile event={event} getEvent={getEvent} />
          <DeletionTile itemType="event" item={event} />
        </>
      ) : isError ? (
        <div className="event__no-data">
          <h3 className="event__no-data-title">Event</h3>
          <p className="event__no-data-subtitle">Error loading event</p>
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  )
}

export default EventPage
