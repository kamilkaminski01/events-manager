import { IParticipant } from 'models/participant'
import { IEvent } from 'models/event'

export interface DeletionTileProps {
  itemType: 'participant' | 'event'
  item: IParticipant | IEvent
}
