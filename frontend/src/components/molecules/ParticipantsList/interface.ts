import { IParticipant } from 'models/participant'

export interface ParticipantsListProps {
  participants: IParticipant[]
  getParticipants: () => void
}
