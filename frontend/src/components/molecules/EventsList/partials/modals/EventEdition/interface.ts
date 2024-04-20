import { IParticipant } from 'models/participant'

export interface EventEditionProps {
  id: number
  name: string
  host: IParticipant | null
}
