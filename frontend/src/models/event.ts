import { IParticipant } from 'models/participant'

export interface IEvent {
  id: number
  name: string
  host: IParticipant
  participants: IParticipant[]
}
