import './style.scss'
import { MealPreferenceProps } from './interface'
import { EMealPreference } from 'models/mealPreference'
import Select from 'components/atoms/Select'

const MealPreference = ({ chosenMealPreference, transformData = false }: MealPreferenceProps) => {
  return (
    <div className="meal-preference">
      <h3 className="meal-preference__title">Meal preference</h3>
      <Select
        name="mealPreference"
        options={[
          { value: EMealPreference.Carnivorous, text: 'Carnivorous' },
          { value: EMealPreference.Vegetarian, text: 'Vegetarian' }
        ]}
        defaultValue={
          chosenMealPreference
            ? transformData
              ? chosenMealPreference.toUpperCase()
              : chosenMealPreference
            : undefined
        }
        blankOption
      />
    </div>
  )
}

export default MealPreference
