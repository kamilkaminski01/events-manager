import { IEvent } from 'models/event'
import { useContext } from 'react'
import useData from 'hooks/useData'
import { ENDPOINTS } from 'utils/consts'
import { ICreateEvent } from 'models/requests/createEvent'
import { EventsContext } from 'providers/events/context'
import { ParticipantsContext } from 'providers/participants/context'

const useEvent = () => {
  const { updateEventsData } = useContext(EventsContext)
  const { updateParticipantsData } = useContext(ParticipantsContext)

  const {
    data: event,
    isError,
    getData: getEvent,
    createData: createEvent,
    updateData: updateEvent,
    deleteData: deleteEvent,
    ...rest
  } = useData<IEvent, IEvent, ICreateEvent>(ENDPOINTS.events, {
    transformGetData: () => {
      updateEventsData()
      updateParticipantsData()
    }
  })

  return {
    event,
    isError,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    ...rest
  }
}

export default useEvent
