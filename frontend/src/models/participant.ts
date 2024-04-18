import { EMealPreference } from 'models/mealPreference'
import { EMealType } from 'models/mealType'

export interface IParticipant {
  id: number
  firstName: string
  lastName: string
  isHost: boolean
  mealPreference: EMealPreference
  chosenMeals: EMealType[]
}
