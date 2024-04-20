import { IEvent } from 'models/event'

export interface EventsContextProps {
  eventsData: IEvent[]
  updateEventsData: () => void
  isLoading: boolean
  isError: boolean
}
