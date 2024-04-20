import { EMealType } from 'models/mealType'
import { EMealPreference } from 'models/mealPreference'

export interface ParticipantEditionModalProps {
  id: number
  firstName: string
  lastName: string
  chosenMealPreference: EMealPreference
  chosenMeals: EMealType[]
}
