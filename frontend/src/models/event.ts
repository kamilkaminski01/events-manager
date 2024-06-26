import { IParticipant } from 'models/participant'

export interface IEvent {
  id: number
  name: string
  hostId?: number
  host: IParticipant | null
  participants: IParticipant[]
}
