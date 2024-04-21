import { EMealPreference } from 'models/mealPreference'
import { EMealType } from 'models/mealType'

export interface ParticipantDataModalProps {
  participantId: number
  getParticipant: (participantId: number) => void
  defaultValue?: string
  chosenMealPreference?: EMealPreference | null
  chosenMeals?: EMealType[]
}
