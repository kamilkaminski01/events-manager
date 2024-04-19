import { EMealType } from 'models/mealType'
import { FieldValues } from 'react-hook-form'

export const filterChosenMeals = (data: FieldValues) => {
  return Object.keys(data)
    .filter((key) => Object.values(EMealType).includes(key as EMealType))
    .filter((key) => data[key])
    .map((key) => key as EMealType)
}
