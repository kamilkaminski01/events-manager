import { FieldValues } from 'react-hook-form'
import { IParticipant } from 'models/participant'

export const filterParticipantsIds = (participantsIds: FieldValues) => {
  return (
    Object.entries(participantsIds)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_id, value]) => value === true)
      .map(([id]) => parseInt(id))
  )
}

export const filterEventsParticipantsIds = (participants: IParticipant[]) => {
  return participants.map((participant) => participant.id)
}
