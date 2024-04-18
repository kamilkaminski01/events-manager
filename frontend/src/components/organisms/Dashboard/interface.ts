import { IParticipant } from 'models/participant'

export interface DashboardProps {
  participants: IParticipant[] | undefined
  isError: boolean
  isLoading: boolean
  getParticipants: () => void
}
