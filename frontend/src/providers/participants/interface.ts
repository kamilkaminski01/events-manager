import { IParticipant } from 'models/participant'

export interface ParticipantsContextProps {
  participantsData: IParticipant[]
  updateParticipantsData: () => void
  isLoading: boolean
  isError: boolean
}
