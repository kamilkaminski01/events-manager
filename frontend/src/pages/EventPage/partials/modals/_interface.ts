import { IEvent } from 'models/event'
import { IParticipant } from 'models/participant'

export interface EventDataModalProps {
  eventId: number
  getEvent: (eventId: number) => void
  defaultValue?: string | IEvent
  defaultHost?: IParticipant | null
}
