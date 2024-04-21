import { IEvent } from 'models/event'

export interface EventDataTileProps {
  event: IEvent
  getEvent: (eventId: number) => void
}
