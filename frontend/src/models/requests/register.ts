import { EMealPreference } from 'models/mealPreference'
import { EMealType } from 'models/mealType'

export interface IRegister {
  firstName: string
  lastName: string
  mealPreference: EMealPreference
  chosenMeals: EMealType[]
}
