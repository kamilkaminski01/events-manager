import { EMealPreference } from 'models/mealPreference'
import { EMealType } from 'models/mealType'

export interface IMealOptions {
  mealPreference: EMealPreference | null
  chosenMeals: EMealType[]
}
