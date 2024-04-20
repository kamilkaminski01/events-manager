import { useCallback, useContext, useState } from 'react'
import { EventsContext } from 'providers/events/context'
import { IEvent } from 'models/event'
import { IServerResponse } from 'models/serverResponse'
import { generatePath } from 'react-router-dom'
import { ENDPOINTS } from 'utils/consts'
import axiosDefault from 'setup/axios/defaultInstance'
import { parseApiErrors } from 'utils/parseApiErrors'

const useEvents = () => {
  const { updateEventsData } = useContext(EventsContext)
  const [eventsData, setEventsData] = useState<IEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const getEventsData = useCallback(async (): Promise<IServerResponse> => {
    try {
      setIsLoading(true)
      setIsError(false)
      const endpoint = generatePath(ENDPOINTS.events) + '/'
      const response = await axiosDefault.get(endpoint)

      setEventsData(response.data)

      return { succeed: true }
    } catch (error) {
      setIsError(true)

      return parseApiErrors(error)
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateEventsData])

  return { eventsData, getEventsData, isLoading, isError }
}

export default useEvents
