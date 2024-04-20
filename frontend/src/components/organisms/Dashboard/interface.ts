import { IParticipant } from 'models/participant'
import { IEvent } from 'models/event'

export interface DashboardProps {
  contentType: string
  content: IParticipant[] | IEvent[]
  isError: boolean
}
