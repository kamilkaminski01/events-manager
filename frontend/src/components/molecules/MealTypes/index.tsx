import './style.scss'
import { MealTypesProps } from './interface'
import Checkbox from 'components/atoms/Checkbox'
import { EMealType } from 'models/mealType'
import { upperCaseMeals } from 'utils/filterChosenMeals'

const MealTypes = ({ chosenMeals, transformData = false }: MealTypesProps) => {
  return (
    <div className="meal-types">
      <Checkbox
        name={EMealType.Breakfast}
        defaultValue={
          transformData
            ? upperCaseMeals(chosenMeals).includes(EMealType.Breakfast)
            : chosenMeals.includes(EMealType.Breakfast)
        }>
        Breakfast
      </Checkbox>
      <Checkbox
        name={EMealType.Dinner}
        defaultValue={
          transformData
            ? upperCaseMeals(chosenMeals).includes(EMealType.Dinner)
            : chosenMeals.includes(EMealType.Dinner)
        }>
        Dinner
      </Checkbox>
      <Checkbox
        name={EMealType.Supper}
        defaultValue={
          transformData
            ? upperCaseMeals(chosenMeals).includes(EMealType.Supper)
            : chosenMeals.includes(EMealType.Supper)
        }>
        Supper
      </Checkbox>
    </div>
  )
}

export default MealTypes
