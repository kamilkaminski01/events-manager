import { IParticipant } from 'models/participant'

export interface ICreateEvent {
  name: string
  hostId: IParticipant
  participants?: number[]
}
