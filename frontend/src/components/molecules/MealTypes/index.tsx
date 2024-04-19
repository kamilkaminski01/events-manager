import './style.scss'
import { MealTypesProps } from './interface'
import Checkbox from 'components/atoms/Checkbox'
import { EMealType } from 'models/mealType'

const MealTypes = ({ chosenMeals, transformData = false }: MealTypesProps) => {
  const transformedChosenMeals = (chosenMeals: EMealType[]) => {
    return chosenMeals.map((chosenMeal) => chosenMeal.toUpperCase())
  }

  return (
    <div className="meal-types">
      <Checkbox
        name={EMealType.Breakfast}
        defaultValue={
          transformData
            ? transformedChosenMeals(chosenMeals).includes(EMealType.Breakfast)
            : chosenMeals.includes(EMealType.Breakfast)
        }>
        Breakfast
      </Checkbox>
      <Checkbox
        name={EMealType.Dinner}
        defaultValue={
          transformData
            ? transformedChosenMeals(chosenMeals).includes(EMealType.Dinner)
            : chosenMeals.includes(EMealType.Dinner)
        }>
        Dinner
      </Checkbox>
      <Checkbox
        name={EMealType.Supper}
        defaultValue={
          transformData
            ? transformedChosenMeals(chosenMeals).includes(EMealType.Supper)
            : chosenMeals.includes(EMealType.Supper)
        }>
        Supper
      </Checkbox>
    </div>
  )
}

export default MealTypes
