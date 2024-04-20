import React, { PropsWithChildren, useEffect } from 'react'
import { EventsContext } from './context'
import useEvents from 'hooks/useEvents'

const EventsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { eventsData, getEventsData, isLoading, isError } = useEvents()

  const updateEventsData = () => getEventsData()

  useEffect(() => {
    getEventsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <EventsContext.Provider value={{ eventsData, updateEventsData, isLoading, isError }}>
      {children}
    </EventsContext.Provider>
  )
}

export default EventsProvider
