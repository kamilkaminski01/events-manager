import { EMealPreference } from 'models/mealPreference'
import { EMealType } from 'models/mealType'

export interface ICreateParticipant {
  firstName: string
  lastName: string
  mealPreference: EMealPreference
  chosenMeals: EMealType[]
}
