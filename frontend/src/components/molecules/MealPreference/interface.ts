import { EMealPreference } from 'models/mealPreference'

export interface MealPreferenceProps {
  chosenMealPreference: EMealPreference | null
  transformData?: boolean
}
