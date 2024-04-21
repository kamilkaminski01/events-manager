import { IParticipant } from 'models/participant'

export interface ParticipantDataProps {
  participant: IParticipant
  getParticipant: () => void
}
