import { IParticipant } from 'models/participant'
import { Dispatch, SetStateAction } from 'react'
import { FieldValues } from 'react-hook-form'

export interface ParticipantsModalProps {
  participants: IParticipant[]
  participantsIds: number[]
  setParticipantsIds?: Dispatch<SetStateAction<number[]>>
  onSubmit?: (data: FieldValues) => void
}
