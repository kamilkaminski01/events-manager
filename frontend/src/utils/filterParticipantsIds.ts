import { FieldValues } from 'react-hook-form'

export const filterParticipantsIds = (participantsIds: FieldValues) => {
  return (
    Object.entries(participantsIds)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_id, value]) => value === true)
      .map(([id]) => parseInt(id))
  )
}
